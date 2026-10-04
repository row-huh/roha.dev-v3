"use client"

import Link from "next/link"

export const writingTopics = [
  { name: "Dev Notes", value: "dev-notes" },
  { name: "Side Notes", value: "side-notes" },
  { name: "Error Logs", value: "error-logs" },
]

export interface RecentPost {
  slug: string
  title: string
}

interface WritingSidebarProps {
  recentPosts: RecentPost[]
  selectedTopic?: string
  activeSlug?: string
  // When provided, topics filter in place; otherwise they link to the writing page.
  onSelectTopic?: (topic: string) => void
}

const itemClass = "block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors"
const activeClass = "bg-gray-800/80 text-white"
const inactiveClass = "text-gray-400 hover:bg-gray-800/40 hover:text-white"

export default function WritingSidebar({ recentPosts, selectedTopic, activeSlug, onSelectTopic }: WritingSidebarProps) {
  const topicItem = (name: string, value: string) => {
    const className = `${itemClass} ${selectedTopic === value ? activeClass : inactiveClass}`
    return onSelectTopic ? (
      <button onClick={() => onSelectTopic(value)} className={className}>
        {name}
      </button>
    ) : (
      <Link href={value === "all" ? "/writing" : `/writing?topic=${value}`} className={className}>
        {name}
      </Link>
    )
  }

  return (
    <aside className="hidden w-52 shrink-0 lg:block">
      <nav
        className="sticky top-28 flex max-h-[calc(100vh-8rem)] flex-col gap-8 overflow-y-auto"
        aria-label="Writing navigation"
      >
        {topicItem("All posts", "all")}

        <div>
          <p className="mb-2 px-3 text-sm font-medium text-white">Recent</p>
          <ul className="flex flex-col">
            {recentPosts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/writing/${post.slug}`}
                  className={`${itemClass} ${post.slug === activeSlug ? activeClass : inactiveClass} line-clamp-2`}
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-2 px-3 text-sm font-medium text-white">Topics</p>
          <ul className="flex flex-col">
            {writingTopics.map((topic) => (
              <li key={topic.value}>{topicItem(topic.name, topic.value)}</li>
            ))}
          </ul>
        </div>
      </nav>
    </aside>
  )
}
