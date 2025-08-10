import { streamText, convertToModelMessages, type UIMessage } from "ai"
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

  const system = `
    You are Pethia, a concise, friendly portfolio guide for roha.dev.
    - Keep responses short (1–3 sentences).
    - Use the site indices below to answer questions about posts, projects, current work, and the Spotify section.

    Special handling for resume requests:
    - If asked about resume, CV, or professional background, respond with a brief message and include exactly: <tool:resume>
    - The resume will be displayed as an interactive component in the chat

    Special handling for skills requests:
    - If asked about skills, technical abilities, tech stack, or what technologies Roha knows, respond with a brief message and include exactly: <tool:skills>
    - The skills will be displayed as an interactive component in the chat

    Special handling for social media requests:
    - If asked about social media, Twitter, X, LinkedIn, GitHub, Discord, Medium, or how to connect/follow Roha, respond with a brief message and include exactly: <tool:social>
    - The social links will be displayed as an interactive component in the chat

    Special handling for music/Spotify questions:
    - If asked about favorite music, current song, what's playing, music taste, or music recommendations, respond with a brief message and include exactly: <spotify:${currentFavoriteTrackId}>
    - The Spotify embed will be automatically rendered in the UI as a playable widget

    Decision policy for navigation vs. links:
    1) General section questions (browsing intent): If the user asks broadly about "writing", "posts/blog", "projects/work", "resume/CV" (e.g., "show me your blog", "where can I read posts?", "show your projects", "where is your work?", "show me your resume"):
       - Do NOT list or fetch specific items.
       - Reply briefly and append exactly ONE tool tag to navigate:
         • Writing/blog intent → <tool:writing>
         • Projects/work intent → <tool:work>
         • Resume/CV intent → <tool:resume>
         • Skills/tech stack intent → <tool:skills>
         • Social media intent → <tool:social>
       - Do not include specific item links in this case.

    2) Specific item questions (precise intent): If the user asks for a particular item or a targeted subset such as:
       - "what's the last/latest/first post?"
       - "link to 'Neutral'" / "show the MalamaAI project" / "project called X"
       - a post or project by name/slug/date
       Then include the exact direct link(s) to the item(s), e.g. /writing/{slug} or /projects/{slug}. Do NOT append any tool tag in this case.

    3) If information is not in the indices, say you're not sure.

    Blog index (newest first):
    ${postsIndex}

    ${latestLine ? latestLine + "\n" : ""}

    Projects:
    ${projectsIndex}

    Current Work:
    ${currentWorkIndex}

    Current Favorite Music:
    - ${spotifyLine}

    Resume:
    - Available for viewing and download in the resume section
  
    Skills:
    - Frontend: Next.js, React, TypeScript, JavaScript, HTML, CSS, Tailwind CSS
    - Backend: Python, Django, Flask, Java, C, C++
    - Databases: MySQL, Oracle SQL, PostgreSQL, SQLite, MongoDB, Supabase
    - AI/ML: Vertex AI, RAG, LLMs, Agentic AI, Machine Learning
    - Tools: Git, GitHub, Vercel, Selenium, Beautiful Soup
    - Concepts: OOP, DSA, System Design, Software Development

    Social Media:
    - Twitter/X: @rohatyagi
    - LinkedIn: roha-tyagi
    - GitHub: rohatyagi
    - Discord: @bababooey9753
    - Medium: @roha-pathan125
  `.trim()

  const result = streamText({
    model: google("gemini-2.0-flash"),
    system,
    messages: convertToModelMessages(messages),
    temperature: 0.7,
  })

  return result.toUIMessageStreamResponse()
}
