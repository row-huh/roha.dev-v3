import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"

const postsDirectory = path.join(process.cwd(), "app", "writing", "posts")

export interface BlogPostMetadata {
  slug: string
  title: string
  description: string
  date: string
  image: string
  category: string
}

export interface BlogHeading {
  id: string
  text: string
  level: number
}

export interface BlogPostContent extends BlogPostMetadata {
  contentHtml: string
  headings: BlogHeading[]
}

function decodeEntities(text: string): string {
  return text
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
}

// Gives every heading an id so the table of contents can link to it.
function addHeadingIds(contentHtml: string): { contentHtml: string; headings: BlogHeading[] } {
  const headings: BlogHeading[] = []
  const used = new Map<string, number>()
  const withIds = contentHtml.replace(/<h([1-6])>([\s\S]*?)<\/h\1>/g, (_, level: string, inner: string) => {
    const text = decodeEntities(inner.replace(/<[^>]+>/g, "")).trim()
    const base = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "section"
    const count = used.get(base) ?? 0
    used.set(base, count + 1)
    const id = count === 0 ? base : `${base}-${count + 1}`
    headings.push({ id, text, level: Number(level) })
    return `<h${level} id="${id}">${inner}</h${level}>`
  })
  return { contentHtml: withIds, headings }
}

export async function getSortedPostsData(): Promise<BlogPostMetadata[]> {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const slug = fileName.replace(/\.md$/, "")

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, "utf8")

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the slug
    return {
      slug,
      ...(matterResult.data as { title: string; description: string; date: string; image: string; category: string }),
    }
  })
  // Dates are stored like "October 14, 2025", so they must be parsed rather than compared as strings
  return allPostsData.sort((a, b) => (Date.parse(b.date) || 0) - (Date.parse(a.date) || 0))
}

export async function getPostData(slug: string): Promise<BlogPostContent> {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, "utf8")

  // Use gray-matter to parse the post metadata section and content
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark().use(html).process(matterResult.content)
  const { contentHtml, headings } = addHeadingIds(processedContent.toString())

  // Combine the data with the slug and contentHtml
  return {
    slug,
    contentHtml,
    headings,
    ...(matterResult.data as { title: string; description: string; date: string; image: string; category: string }),
  }
}