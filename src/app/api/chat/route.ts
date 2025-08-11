import { streamText, convertToModelMessages, type UIMessage } from "ai"
import { google } from "@ai-sdk/google"
import { getAssistantKnowledge } from "@/lib/site-knowledge"
import fs from "fs"
import path from "path"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  // Load site knowledge for every request (fast local reads). If any part fails, keep going.
  let postsIndex = ""
  let latestLine = ""
  let projectsIndex = ""
  let currentWorkIndex = ""
  let spotifyLine = ""
  let currentFavoriteTrackId = ""

  try {
    const { posts, projects, currentWork, spotify } = await getAssistantKnowledge()

    // Blog index (newest first)
    postsIndex =
      posts.map((p) => `- ${p.date} • ${p.title} • /writing/${p.slug} • ${p.category || "uncategorized"}`).join("\n") ||
      "- No posts found."
    if (posts.length > 0) {
      const latest = posts[0]
      latestLine = `Most recent post: ${latest.title} (/writing/${latest.slug}) on ${latest.date}.`
    }

    // Projects index
    projectsIndex =
      projects
        .map((p) => {
          const extra: string[] = []
          if (p.github) extra.push(`GitHub: ${p.github}`)
          if (p.live) extra.push(`Live: ${p.live}`)
          const extras = extra.length ? ` • ${extra.join(" • ")}` : ""
          return `- ${p.title} • /projects/${p.slug}${extras}`
        })
        .join("\n") || "- No projects found."

    // Current work
    currentWorkIndex =
      currentWork.map((w) => `- ${w.title} • /projects/${w.slug}${w.summary ? ` • ${w.summary}` : ""}`).join("\n") ||
      "- No current work declared."

    // Spotify section (current favorite track)
    spotifyLine = `Current song on repeat: Palm Creases by Meego. Spotify: https://open.spotify.com/track/6zHiZppuA4gzZoaiMUu0hf`

    currentFavoriteTrackId = "6zHiZppuA4gzZoaiMUu0hf"
  } catch {
    // Keep indices empty; assistant will still respond.
    currentFavoriteTrackId = "6zHiZppuA4gzZoaiMUu0hf"
  }

  // Read system instructions from public/ai/instructions.txt
  const instructionsPath = path.join(process.cwd(), "public", "ai", "instructions.txt")
  const instructions = fs.readFileSync(instructionsPath, "utf-8")

    
  const system = instructions.trim()
  const result = streamText({
    model: google("gemini-2.0-flash"),
    system,
    messages: convertToModelMessages(messages),
    temperature: 0.7,
  })

  return result.toUIMessageStreamResponse()
}
