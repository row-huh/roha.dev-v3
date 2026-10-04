"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export interface PostFormValues {
  slug: string
  title: string
  description: string
  date: string
  image: string
  category: string
  content: string
}

const CATEGORIES = [
  { name: "SideNotes", value: "side-notes" },
  { name: "Error Logs", value: "error-logs" },
  { name: "Dev Notes", value: "dev-notes" },
  { name: "Highlights", value: "highlights" },
]

function pad(n: number): string {
  return String(n).padStart(2, "0")
}

// Posts store dates like "October 14, 2025"; the date input needs YYYY-MM-DD.
function toInputDate(stored: string): string {
  const date = stored ? new Date(stored) : new Date()
  if (Number.isNaN(date.getTime())) return ""
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

function toStoredDate(input: string): string {
  const [year, month, day] = input.split("-").map(Number)
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

const labelClass = "flex flex-col gap-1.5 text-sm text-gray-300"

export default function PostForm({ initial }: { initial?: PostFormValues }) {
  const isEdit = Boolean(initial)
  const [title, setTitle] = useState(initial?.title ?? "")
  const [slug, setSlug] = useState(initial?.slug ?? "")
  const [slugTouched, setSlugTouched] = useState(false)
  const [description, setDescription] = useState(initial?.description ?? "")
  const [date, setDate] = useState(toInputDate(initial?.date ?? ""))
  const [image, setImage] = useState(initial?.image ?? "")
  const [category, setCategory] = useState(initial?.category || CATEGORIES[0].value)
  const [content, setContent] = useState(initial?.content.replace(/^\n+/, "") ?? "")
  const [error, setError] = useState("")
  const [saving, setSaving] = useState(false)

  const effectiveSlug = isEdit || slugTouched ? slug : slugify(title)

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setSaving(true)
    setError("")
    const res = await fetch(isEdit ? `/api/admin/posts/${effectiveSlug}` : "/api/admin/posts", {
      method: isEdit ? "PUT" : "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        slug: effectiveSlug,
        title,
        description,
        date: toStoredDate(date),
        image,
        category,
        content,
      }),
    }).catch(() => null)
    if (res?.ok) {
      window.location.href = "/admin"
      return
    }
    const data = await res?.json().catch(() => null)
    setError(data?.error ?? "Save failed")
    setSaving(false)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <h1 className="text-2xl font-semibold">{isEdit ? "Edit post" : "New post"}</h1>

      <label className={labelClass}>
        Title
        <Input value={title} onChange={(e) => setTitle(e.target.value)} maxLength={200} required />
      </label>

      <label className={labelClass}>
        Slug (the URL: /writing/your-slug)
        <Input
          value={effectiveSlug}
          onChange={(e) => {
            setSlugTouched(true)
            setSlug(e.target.value)
          }}
          pattern="[a-z0-9]+(-[a-z0-9]+)*"
          title="Lowercase letters, numbers and hyphens"
          maxLength={100}
          disabled={isEdit}
          required
        />
      </label>

      <label className={labelClass}>
        Description
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} maxLength={500} required />
      </label>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className={labelClass}>
          Date
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </label>
        <label className={labelClass}>
          Category
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="h-9 rounded-md border border-input bg-black px-3 text-sm"
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className={labelClass}>
        Cover image path or URL (optional)
        <Input value={image} onChange={(e) => setImage(e.target.value)} maxLength={500} placeholder="/md-assets/cover.png" />
      </label>

      <label className={labelClass}>
        Content (Markdown)
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-96 font-mono"
          required
        />
      </label>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="flex gap-2">
        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : isEdit ? "Save changes" : "Publish"}
        </Button>
        <Button asChild variant="outline">
          <Link href="/admin">Cancel</Link>
        </Button>
      </div>
    </form>
  )
}
