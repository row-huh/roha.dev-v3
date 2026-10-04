import { adminApi } from "@/lib/admin-auth"
import { listPosts, parsePostInput, savePost } from "@/lib/github-cms"

export async function GET() {
  return adminApi(async () => {
    const posts = await listPosts()
    return Response.json(posts.map(({ slug, title, date, category }) => ({ slug, title, date, category })))
  })
}

export async function POST(request: Request) {
  return adminApi(async () => {
    const body = await request.json().catch(() => null)
    const post = parsePostInput(body, body?.slug)
    await savePost(post, "create")
    return Response.json({ ok: true, slug: post.slug }, { status: 201 })
  })
}
