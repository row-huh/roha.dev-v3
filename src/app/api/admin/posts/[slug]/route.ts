import { adminApi } from "@/lib/admin-auth"
import { CmsError, deletePost, getPost, parseImagesInput, parsePostInput, savePost } from "@/lib/github-cms"

type Context = { params: Promise<{ slug: string }> }

export async function GET(_request: Request, { params }: Context) {
  return adminApi(async () => {
    const post = await getPost((await params).slug)
    if (!post) throw new CmsError("Post not found", 404)
    return Response.json(post)
  })
}

export async function PUT(request: Request, { params }: Context) {
  return adminApi(async () => {
    const body = await request.json().catch(() => null)
    const post = parsePostInput(body, (await params).slug)
    await savePost(post, "update", parseImagesInput(body?.images))
    return Response.json({ ok: true, slug: post.slug })
  })
}

export async function DELETE(_request: Request, { params }: Context) {
  return adminApi(async () => {
    await deletePost((await params).slug)
    return Response.json({ ok: true })
  })
}
