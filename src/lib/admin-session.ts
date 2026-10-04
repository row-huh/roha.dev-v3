// Web Crypto only: this module is imported by middleware, which runs on the Edge runtime.

export const SESSION_COOKIE = "admin_session"
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7

const encoder = new TextEncoder()

async function getKey(): Promise<CryptoKey> {
  const secret = process.env.SESSION_SECRET
  if (!secret || secret.length < 32) {
    throw new Error("SESSION_SECRET is missing or too short")
  }
  return crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, [
    "sign",
  ])
}

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

async function sign(value: string): Promise<ArrayBuffer> {
  return crypto.subtle.sign("HMAC", await getKey(), encoder.encode(value))
}

export async function createSessionToken(): Promise<string> {
  const expiresAt = String(Date.now() + SESSION_MAX_AGE_SECONDS * 1000)
  return `${expiresAt}.${toHex(await sign(expiresAt))}`
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false
  const [expiresAt, signatureHex, ...rest] = token.split(".")
  if (rest.length > 0 || !/^\d{1,16}$/.test(expiresAt ?? "")) return false
  if (!/^[0-9a-f]{64}$/.test(signatureHex ?? "")) return false
  try {
    const expected = toHex(await sign(expiresAt))
    let diff = 0
    for (let i = 0; i < expected.length; i++) diff |= expected.charCodeAt(i) ^ signatureHex.charCodeAt(i)
    return diff === 0 && Number(expiresAt) > Date.now()
  } catch (error) {
    console.error("Session verification failed:", error instanceof Error ? error.message : "unknown")
    return false
  }
}
