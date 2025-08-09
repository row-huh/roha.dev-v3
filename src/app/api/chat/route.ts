import { streamText, convertToModelMessages, UIMessage } from "ai"
import { google } from "@ai-sdk/google"
import { getAssistantKnowledge } from "@/lib/site-knowledge"

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

    // Blog index (newest first)
    postsIndex =
      posts
        .map((p) => `- ${p.date} • ${p.title} • /writing/${p.slug} • ${p.category || "uncategorized"}`)
        .join("\n") || "- No posts found."
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
      currentWork
        .map((w) => `- ${w.title} • /projects/${w.slug}${w.summary ? ` • ${w.summary}` : ""}`)
        .join("\n") || "- No current work declared."

    // Spotify section (static representation from your UI)
    spotifyLine =
      `Now Playing (UI): ${spotify.nowPlayingTitle} — ${spotify.nowPlayingArtist}. ` +
      `Spotify track: ${spotify.url}`
  } catch {
    // Keep indices empty; assistant will still respond.
  }

  const system = `
  You are Pethia, a concise, friendly portfolio guide for roha.dev.
  - Keep responses short (1–3 sentences).
  - Use the site indices below to answer questions about posts, projects, current work, and the Spotify section.

  Decision policy for navigation vs. links:
  1) General section questions (browsing intent): If the user asks broadly about "writing", "posts/blog", "projects/work" (e.g., "show me your blog", "where can I read posts?", "show your projects", "where is your work?"):
     - Do NOT list or fetch specific items.
     - Reply briefly and append exactly ONE tool tag to navigate:
       • Writing/blog intent → <tool:writing>
       • Projects/work intent → <tool:work>
     - Do not include specific item links in this case.

  2) Specific item questions (precise intent): If the user asks for a particular item or a targeted subset such as:
     - "what’s the last/latest/first post?"
     - "link to 'Neutral'" / "show the MalamaAI project" / "project called X"
     - a post or project by name/slug/date
     Then include the exact direct link(s) to the item(s), e.g. /writing/{slug} or /projects/{slug}. Do NOT append any tool tag in this case.

  3) If information is not in the indices, say you’re not sure.

  Blog index (newest first):
  ${postsIndex}

  ${latestLine ? latestLine + "\n" : ""}

  Projects:
  ${projectsIndex}

  Current Work:
  ${currentWorkIndex}

  Spotify:
  - ${spotifyLine}
  `.trim()

  const result = streamText({
    model: google("gemini-2.0-flash"),
    system,
    messages: convertToModelMessages(messages),
    temperature: 0.7,
  })

  return result.toUIMessageStreamResponse()
}
