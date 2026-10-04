import { scryptSync, timingSafeEqual } from "crypto"
import { cookies } from "next/headers"
import { SESSION_COOKIE, verifySessionToken } from "@/lib/admin-session"
import { CmsError } from "@/lib/github-cms"

// ADMIN_PASSWORD_HASH format: "<salt hex>:<scrypt hash hex>" (no "$", which .env files would expand).
export function verifyPassword(password: string): boolean {
  const [saltHex, hashHex] = (process.env.ADMIN_PASSWORD_HASH ?? "").split(":")
  if (!saltHex || !hashHex) return false
  const expected = Buffer.from(hashHex, "hex")
  if (expected.length !== 64) return false
  const actual = scryptSync(password, Buffer.from(saltHex, "hex"), 64)
  return timingSafeEqual(actual, expected)
}

export async function isAdminRequest(): Promise<boolean> {
  const store = await cookies()
  return verifySessionToken(store.get(SESSION_COOKIE)?.value)
}

// Re-checks the session inside the handler so the API doesn't rely on middleware alone.
export async function adminApi(handler: () => Promise<Response>): Promise<Response> {
  if (!(await isAdminRequest())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }
  try {
    return await handler()
  } catch (error) {
    if (error instanceof CmsError) {
      return Response.json({ error: error.message }, { status: error.status })
    }
    console.error("Admin API error:", error instanceof Error ? error.message : "unknown")
    return Response.json({ error: "Something went wrong" }, { status: 500 })
  }
}

const MAX_FAILURES = 5
const WINDOW_MS = 15 * 60 * 1000
const failures = new Map<string, { count: number; resetAt: number }>()

// Best effort only: serverless instances don't share this map.
export function isLockedOut(ip: string): boolean {
  const entry = failures.get(ip)
  if (!entry) return false
  if (entry.resetAt < Date.now()) {
    failures.delete(ip)
    return false
  }
  return entry.count >= MAX_FAILURES
}

export function recordFailure(ip: string): void {
  const now = Date.now()
  const entry = failures.get(ip)
  if (!entry || entry.resetAt < now) {
    failures.set(ip, { count: 1, resetAt: now + WINDOW_MS })
  } else {
    entry.count++
  }
}

export function clearFailures(ip: string): void {
  failures.delete(ip)
}
