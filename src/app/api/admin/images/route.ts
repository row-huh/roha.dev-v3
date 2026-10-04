import { adminApi } from "@/lib/admin-auth"
import { uploadImage } from "@/lib/github-cms"

export async function POST(request: Request) {
  return adminApi(async () => {
    const body = await request.json().catch(() => null)
    return Response.json(await uploadImage(body?.data), { status: 201 })
  })
}
