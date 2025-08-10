import { getSortedPostsData } from "@/lib/blog"
import { projectDetails } from "@/app/projects/[slug]/projectDetails"

type ProjectIndexItem = {
  slug: string
  title: string
  github?: string
  live?: string
}

type CurrentWorkItem = {
  slug: string
  title: string
  summary?: string
}

/**
 * Central site knowledge for the assistant.
 * - Blogs from lib/blog.ts
 * - Projects from projectDetails map
 * - "Currently working on" selection
 * - Spotify "now playing" (from your embed + NowPlaying UI)
 */
export async function getAssistantKnowledge() {
  // Blog posts (already sorted by date desc in getSortedPostsData)
  const posts = await getSortedPostsData()

  // Projects index from projectDetails map (keys = slugs)
  const projects: ProjectIndexItem[] = Object.entries(projectDetails).map(([slug, p]: [string, any]) => ({
    slug,
    title: p?.title ?? slug,
    github: p?.githubLink || "",
    live: p?.liveDemoLink || "",
  }))

  // "Currently working on" — centralized here.
  // You marked this in the Projects page via isCurrentlyWorking; we mirror it here.
  const currentWork: CurrentWorkItem[] = [
    {
      slug: "llm-from-scratch",
      title:
        projects.find((x) => x.slug === "llm-from-scratch")?.title || "LLM from Scratch: Unveiling the Transformer",
      summary:
        "Deep dive into transformers by building an LLM from first principles; focus on attention, training loops, and PyTorch.",
    },
  ]

  // Spotify section — current favorite track
  const spotify = {
    // Current favorite track - Palm Creases by Meego
    currentFavorite: {
      trackId: "6zHiZppuA4gzZoaiMUu0hf",
      title: "Palm Creases",
      artist: "Meego",
      url: "https://open.spotify.com/track/6zHiZppuA4gzZoaiMUu0hf?si=6901467c559542aa",
      embedUrl: "https://open.spotify.com/embed/track/6zHiZppuA4gzZoaiMUu0hf?utm_source=generator",
    },
    // Legacy fields for compatibility
    trackId: "6zHiZppuA4gzZoaiMUu0hf",
    url: "https://open.spotify.com/track/6zHiZppuA4gzZoaiMUu0hf",
    nowPlayingTitle: "Palm Creases",
    nowPlayingArtist: "Meego",
  }

  return { posts, projects, currentWork, spotify }
}
