import { streamText, convertToModelMessages, UIMessage } from "ai"
import { google } from "@ai-sdk/google"
import { getAssistantKnowledge } from "@/lib/site-knowledge"
import { promises as fs } from "fs"
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

  try {
    const { posts, projects, currentWork, spotify } = await getAssistantKnowledge()

    postsIndex =
      posts
        .map((p) => `- ${p.date} • ${p.title} • /writing/${p.slug} • ${p.category || "uncategorized"}`)
        .join("\n") || "- No posts found."
    if (posts.length > 0) {
      const latest = posts[0]
      latestLine = `Most recent post: ${latest.title} (/writing/${latest.slug}) on ${latest.date}.`
    }

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

    currentWorkIndex =
      currentWork
        .map((w) => `- ${w.title} • /projects/${w.slug}${w.summary ? ` • ${w.summary}` : ""}`)
        .join("\n") || "- No current work declared."

    spotifyLine =
      `Now Playing (UI): ${spotify.nowPlayingTitle} — ${spotify.nowPlayingArtist}. ` +
      `Spotify track: ${spotify.url}`
  } catch {
    // Keep indices empty; assistant will still respond.
  }

  // Read instructions from file (server-side)
  let instruction = ""
  try {
    const instructionsPath = path.join(process.cwd(), "public", "ai", "instructions.txt")
    instruction = await fs.readFile(instructionsPath, "utf-8")
  } catch (err) {
    console.error("Error reading instructions.txt:", err)
  }

  const system = instruction.trim()

  const result = streamText({
    model: google("gemini-2.0-flash"),
    system,
    messages: convertToModelMessages(messages),
    temperature: 0.7,
  })

  return result.toUIMessageStreamResponse()
}
