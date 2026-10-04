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
    repoUrl: `https://api.github.com/repos/${owner}/${repo}`,
    postsPath: process.env.GITHUB_POSTS_PATH || "src/app/writing/posts",
    imagesPath: process.env.GITHUB_IMAGES_PATH || "src/public/md-assets",
  }
}

async function github(path: string, init?: { method: string; body: Record<string, unknown> }): Promise<Response> {
  const { token, repoUrl } = config()
  return fetch(`${repoUrl}${path}`, {
    method: init?.method ?? "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body: init ? JSON.stringify(init.body) : undefined,
    cache: "no-store",
  }).catch(() => {
    throw new CmsError("Could not reach GitHub. Check your connection and try again.", 502)
  })
}

async function githubJson<T>(action: string, path: string, init?: { method: string; body: Record<string, unknown> }): Promise<T> {
  const res = await github(path, init)
  if (!res.ok) throw new CmsError(`GitHub ${action} failed (${res.status})`, 502)
  return (await res.json()) as T
}

function contentsPath(filePath: string): string {
  return `/contents/${filePath}?ref=${encodeURIComponent(config().branch)}`
}

function postFilePath(slug: string): string {
  assertValidSlug(slug)
  return `${config().postsPath}/${slug}.md`
}

async function getFile(slug: string): Promise<{ sha: string; raw: string } | null> {
  const res = await github(contentsPath(postFilePath(slug)))
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
  const entries = await githubJson<{ name: string; type: string }[]>("list", contentsPath(config().postsPath))
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

export interface PostImage {
  name: string
  sha: string
}

const IMAGE_NAME_PATTERN = /^image\d{0,4}\.(png|jpg|gif|webp)$/
const MAX_IMAGE_BASE64_LENGTH = 4_000_000
const MAX_IMAGES_PER_SAVE = 30

function imageExtension(bytes: Buffer): string | null {
  if (bytes.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return "png"
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "jpg"
  if (bytes.subarray(0, 4).toString("latin1") === "GIF8") return "gif"
  if (bytes.subarray(0, 4).toString("latin1") === "RIFF" && bytes.subarray(8, 12).toString("latin1") === "WEBP") return "webp"
  return null
}

// Stores the image in the repo as an unattached blob; it only becomes a file when a post save references it.
export async function uploadImage(data: unknown): Promise<{ sha: string; extension: string }> {
  if (typeof data !== "string" || !/^[A-Za-z0-9+/]+={0,2}$/.test(data)) throw new CmsError("Invalid image data", 400)
  if (data.length > MAX_IMAGE_BASE64_LENGTH) throw new CmsError("Image is too large (3 MB max)", 413)
  const extension = imageExtension(Buffer.from(data.slice(0, 64), "base64"))
  if (!extension) throw new CmsError("Only PNG, JPEG, GIF and WebP images are supported", 400)
  const blob = await githubJson<{ sha: string }>("image upload", "/git/blobs", {
    method: "POST",
    body: { content: data, encoding: "base64" },
  })
  return { sha: blob.sha, extension }
}

export function parseImagesInput(input: unknown): PostImage[] {
  if (input === undefined) return []
  if (!Array.isArray(input) || input.length > MAX_IMAGES_PER_SAVE) throw new CmsError("Invalid images", 400)
  return input.map((item) => {
    const { name, sha } = (item ?? {}) as Record<string, unknown>
    if (typeof name !== "string" || !IMAGE_NAME_PATTERN.test(name)) throw new CmsError("Invalid image name", 400)
    if (typeof sha !== "string" || !/^[0-9a-f]{40}$/.test(sha)) throw new CmsError("Invalid image reference", 400)
    return { name, sha }
  })
}

export async function listImages(slug: string): Promise<string[]> {
  assertValidSlug(slug)
  const res = await github(contentsPath(`${config().imagesPath}/${slug}`))
  if (res.status === 404) return []
  if (!res.ok) throw new CmsError(`GitHub list failed (${res.status})`, 502)
  const entries = (await res.json()) as { name: string; type: string }[]
  return Array.isArray(entries) ? entries.filter((e) => e.type === "file").map((e) => e.name) : []
}

// Writes the post and its new images as a single commit, so the site redeploys once.
export async function savePost(post: AdminPost, mode: "create" | "update", images: PostImage[] = []): Promise<void> {
  const { branch, imagesPath } = config()
  const existing = await getFile(post.slug)
  if (mode === "create" && existing) throw new CmsError("A post with this slug already exists", 409)
  if (mode === "update" && !existing) throw new CmsError("Post not found", 404)

  const { slug, content, ...frontmatter } = post
  const raw = matter.stringify(content.startsWith("\n") ? content : `\n${content}`, frontmatter)

  const ref = await githubJson<{ object: { sha: string } }>("read", `/git/ref/heads/${encodeURIComponent(branch)}`)
  const parent = await githubJson<{ tree: { sha: string } }>("read", `/git/commits/${ref.object.sha}`)
  const postBlob = await githubJson<{ sha: string }>("write", "/git/blobs", {
    method: "POST",
    body: { content: raw, encoding: "utf-8" },
  })
  const entry = (path: string, sha: string) => ({ path, mode: "100644", type: "blob", sha })
  const tree = await githubJson<{ sha: string }>("write", "/git/trees", {
    method: "POST",
    body: {
      base_tree: parent.tree.sha,
      tree: [
        entry(postFilePath(slug), postBlob.sha),
        ...images.map((image) => entry(`${imagesPath}/${slug}/${image.name}`, image.sha)),
      ],
    },
  })
  const commit = await githubJson<{ sha: string }>("write", "/git/commits", {
    method: "POST",
    body: {
      message: `${mode === "create" ? "Add" : "Update"} post: ${slug}`,
      tree: tree.sha,
      parents: [ref.object.sha],
    },
  })
  const update = await github(`/git/refs/heads/${encodeURIComponent(branch)}`, {
    method: "PATCH",
    body: { sha: commit.sha },
  })
  if (update.status === 422) throw new CmsError("The repository changed while saving. Please try again.", 409)
  if (!update.ok) throw new CmsError(`GitHub write failed (${update.status})`, 502)
}

export async function deletePost(slug: string): Promise<void> {
  const existing = await getFile(slug)
  if (!existing) throw new CmsError("Post not found", 404)
  const res = await github(`/contents/${postFilePath(slug)}`, {
    method: "DELETE",
    body: { message: `Delete post: ${slug}`, sha: existing.sha, branch: config().branch },
  })
  if (!res.ok) throw new CmsError(`GitHub delete failed (${res.status})`, 502)
}
