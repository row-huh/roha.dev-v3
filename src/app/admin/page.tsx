"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface PostSummary {
  slug: string
  title: string
  date: string
  category: string
}

export default function AdminDashboardPage() {
  const [posts, setPosts] = useState<PostSummary[] | null>(null)
  const [error, setError] = useState("")

  async function loadPosts() {
    const res = await fetch("/api/admin/posts").catch(() => null)
    if (res?.ok) {
      setPosts(await res.json())
    } else {
      const data = await res?.json().catch(() => null)
      setError(data?.error ?? "Failed to load posts")
    }
  }

  useEffect(() => {
    loadPosts()
  }, [])

  async function handleDelete(post: PostSummary) {
    if (!window.confirm(`Delete "${post.title}"? This commits the deletion to GitHub.`)) return
    setError("")
    const res = await fetch(`/api/admin/posts/${post.slug}`, { method: "DELETE" }).catch(() => null)
    if (res?.ok) {
      setPosts((current) => current?.filter((p) => p.slug !== post.slug) ?? null)
    } else {
      const data = await res?.json().catch(() => null)
      setError(data?.error ?? "Delete failed")
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" })
    window.location.href = "/admin/login"
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Blog posts</h1>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/admin/new">New post</Link>
          </Button>
          <Button variant="outline" onClick={handleLogout}>
            Log out
          </Button>
        </div>
      </div>

      <p className="text-sm text-gray-400">
        Changes are committed to GitHub and go live after the site redeploys (about a minute). The newest post by
        date is featured on the home page.
      </p>

      {error && <p className="text-sm text-red-400">{error}</p>}
      {!posts && !error && <p className="text-sm text-gray-400">Loading...</p>}

      <ul className="flex flex-col divide-y divide-white/10 rounded-md border border-white/10">
        {posts?.map((post) => (
          <li key={post.slug} className="flex items-center justify-between gap-4 p-4">
            <div className="min-w-0">
              <p className="truncate font-medium">{post.title}</p>
              <p className="text-xs text-gray-400">
                {post.date} · {post.category} · /{post.slug}
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <Button asChild size="sm" variant="outline">
                <Link href={`/admin/edit/${post.slug}`}>Edit</Link>
              </Button>
              <Button size="sm" variant="destructive" onClick={() => handleDelete(post)}>
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
