import matter from "gray-matter"

export const CATEGORIES = ["side-notes", "error-logs", "dev-notes"] as const

export interface PostFields {
  title: string
  description: string
  date: string
  image: string
  category: string
}

export interface AdminPost extends PostFields {
  slug: string
  content: string
}

export class CmsError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message)
  }
}

// The slug becomes part of a repo file path, so this pattern is what stops writes outside the posts folder.
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export function assertValidSlug(slug: string): void {
  if (!SLUG_PATTERN.test(slug) || slug.length > 100) {
    throw new CmsError("Slug must be lowercase letters, numbers and hyphens", 400)
  }
}

export function parsePostInput(input: unknown, slug: unknown): AdminPost {
  const body = (input ?? {}) as Record<string, unknown>
  const text = (key: string, max: number, required: boolean): string => {
    const value = body[key]
    if (typeof value !== "string" || value.length > max || (required && !value.trim())) {
      throw new CmsError(`Invalid ${key}`, 400)
    }
    return value
  }
  if (typeof slug !== "string") throw new CmsError("Invalid slug", 400)
  assertValidSlug(slug)
  const post: AdminPost = {
    slug,
    title: text("title", 200, true).trim(),
    description: text("description", 500, true).trim(),
    date: text("date", 40, true).trim(),
    image: text("image", 500, false).trim(),
    category: text("category", 40, true),
    content: text("content", 500_000, true),
  }
  if (Number.isNaN(Date.parse(post.date))) throw new CmsError("Invalid date", 400)
  if (!(CATEGORIES as readonly string[]).includes(post.category)) throw new CmsError("Invalid category", 400)
  return post
}

function config() {
  const token = process.env.GITHUB_TOKEN
  const owner = process.env.GITHUB_REPO_OWNER
  const repo = process.env.GITHUB_REPO_NAME
  if (!token || !owner || !repo) {
    throw new CmsError("GitHub CMS environment variables are not configured", 500)
  }
  return {
    token,
    branch: process.env.GITHUB_BRANCH || "main",
    contentsUrl: `https://api.github.com/repos/${owner}/${repo}/contents/${process.env.GITHUB_POSTS_PATH || "src/app/writing/posts"}`,
  }
}

async function github(path: string, init?: { method: string; body: Record<string, unknown> }): Promise<Response> {
  const { token, branch, contentsUrl } = config()
  const url = `${contentsUrl}${path}` + (init ? "" : `?ref=${encodeURIComponent(branch)}`)
  return fetch(url, {
    method: init?.method ?? "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body: init ? JSON.stringify({ ...init.body, branch }) : undefined,
    cache: "no-store",
  })
}

async function getFile(slug: string): Promise<{ sha: string; raw: string } | null> {
  assertValidSlug(slug)
  const res = await github(`/${slug}.md`)
  if (res.status === 404) return null
  if (!res.ok) throw new CmsError(`GitHub read failed (${res.status})`, 502)
  const file = (await res.json()) as { sha: string; content: string }
  return { sha: file.sha, raw: Buffer.from(file.content, "base64").toString("utf8") }
}

function toAdminPost(slug: string, raw: string): AdminPost {
  const { data, content } = matter(raw)
  return {
    slug,
    title: String(data.title ?? ""),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    image: String(data.image ?? ""),
    category: String(data.category ?? ""),
    content,
  }
}

export async function listPosts(): Promise<AdminPost[]> {
  const res = await github("")
  if (!res.ok) throw new CmsError(`GitHub list failed (${res.status})`, 502)
  const entries = (await res.json()) as { name: string; type: string }[]
  const slugs = entries
    .filter((e) => e.type === "file" && e.name.endsWith(".md"))
    .map((e) => e.name.replace(/\.md$/, ""))
    .filter((slug) => SLUG_PATTERN.test(slug))
  const posts = await Promise.all(slugs.map((slug) => getPost(slug)))
  return posts
    .filter((p): p is AdminPost => p !== null)
    .sort((a, b) => (Date.parse(b.date) || 0) - (Date.parse(a.date) || 0))
}

export async function getPost(slug: string): Promise<AdminPost | null> {
  const file = await getFile(slug)
  return file ? toAdminPost(slug, file.raw) : null
}

export async function savePost(post: AdminPost, mode: "create" | "update"): Promise<void> {
  const existing = await getFile(post.slug)
  if (mode === "create" && existing) throw new CmsError("A post with this slug already exists", 409)
  if (mode === "update" && !existing) throw new CmsError("Post not found", 404)

  const { slug, content, ...frontmatter } = post
  const raw = matter.stringify(content.startsWith("\n") ? content : `\n${content}`, frontmatter)
  const res = await github(`/${slug}.md`, {
    method: "PUT",
    body: {
      message: `${mode === "create" ? "Add" : "Update"} post: ${slug}`,
      content: Buffer.from(raw, "utf8").toString("base64"),
      sha: existing?.sha,
    },
  })
  if (!res.ok) throw new CmsError(`GitHub write failed (${res.status})`, 502)
}

export async function deletePost(slug: string): Promise<void> {
  const existing = await getFile(slug)
  if (!existing) throw new CmsError("Post not found", 404)
  const res = await github(`/${slug}.md`, {
    method: "DELETE",
    body: { message: `Delete post: ${slug}`, sha: existing.sha },
  })
  if (!res.ok) throw new CmsError(`GitHub delete failed (${res.status})`, 502)
}
