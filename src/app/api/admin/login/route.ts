import { cookies } from "next/headers"
import { clearFailures, isLockedOut, recordFailure, verifyPassword } from "@/lib/admin-auth"
import { SESSION_COOKIE, SESSION_MAX_AGE_SECONDS, createSessionToken } from "@/lib/admin-session"

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
  if (isLockedOut(ip)) {
    return Response.json({ error: "Too many attempts. Try again later." }, { status: 429 })
  }

  const body = await request.json().catch(() => null)
  const password = typeof body?.password === "string" ? body.password : ""
  if (password.length === 0 || password.length > 200 || !verifyPassword(password)) {
    recordFailure(ip)
    return Response.json({ error: "Incorrect password" }, { status: 401 })
  }

  clearFailures(ip)
  const store = await cookies()
  store.set(SESSION_COOKIE, await createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  })
  return Response.json({ ok: true })
}
