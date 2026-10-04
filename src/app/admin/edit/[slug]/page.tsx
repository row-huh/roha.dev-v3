import { notFound, redirect } from "next/navigation"
import { isAdminRequest } from "@/lib/admin-auth"
import { getPost, listImages } from "@/lib/github-cms"
import PostForm from "../../_components/post-form"

export const dynamic = "force-dynamic"

export default async function EditPostPage({ params }: { params: Promise<{ slug: string }> }) {
  if (!(await isAdminRequest())) redirect("/admin/login")
  const { slug } = await params
  const post = await getPost(slug).catch(() => null)
  if (!post) notFound()
  const existingImages = await listImages(slug).catch(() => [])
  return <PostForm initial={post} existingImages={existingImages} />
}
