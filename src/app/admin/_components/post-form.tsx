"use client"

import { useRef, useState } from "react"
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

interface PendingImage {
  name: string
  sha: string
  previewUrl: string
}

const MAX_IMAGE_BYTES = 3 * 1024 * 1024

function readAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result).split(",")[1] ?? "")
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

function nextImageNumber(names: string[]): number {
  const numbers = names.map((name) => Number(/^image(\d*)\./.exec(name)?.[1] ?? 0))
  return Math.max(0, ...numbers) + 1
}

const labelClass = "flex flex-col gap-1.5 text-sm text-gray-300"

export default function PostForm({
  initial,
  existingImages = [],
}: {
  initial?: PostFormValues
  existingImages?: string[]
}) {
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
  const [images, setImages] = useState<PendingImage[]>([])
  const [uploading, setUploading] = useState(false)
  const contentRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const effectiveSlug = isEdit || slugTouched ? slug : slugify(title)
  // Image paths contain the slug, so it can't change once an image has been added.
  const slugLocked = isEdit || images.length > 0
  const imagePath = (name: string) => `/md-assets/${effectiveSlug}/${name}`

  async function addImages(files: File[]) {
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(effectiveSlug)) {
      setError("Add a title (or a valid slug) before adding images")
      return
    }
    setError("")
    setUploading(true)
    setSlug(effectiveSlug)
    setSlugTouched(true)
    const added: PendingImage[] = []
    for (const file of files) {
      if (file.size > MAX_IMAGE_BYTES) {
        setError(`${file.name || "Image"} is larger than 3 MB`)
        continue
      }
      const res = await fetch("/api/admin/images", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ data: await readAsBase64(file) }),
      }).catch(() => null)
      const data = await res?.json().catch(() => null)
      if (!res?.ok) {
        setError(data?.error ?? "Image upload failed")
        continue
      }
      const taken = [...existingImages, ...images.map((i) => i.name), ...added.map((i) => i.name)]
      added.push({
        name: `image${nextImageNumber(taken)}.${data.extension}`,
        sha: data.sha,
        previewUrl: URL.createObjectURL(file),
      })
    }
    if (added.length > 0) {
      const markdown = added.map((image) => `![image](${imagePath(image.name)})`).join("\n\n")
      const cursor = contentRef.current?.selectionStart ?? content.length
      setContent((current) => {
        const at = Math.min(cursor, current.length)
        const before = current.slice(0, at)
        const lead = before === "" || before.endsWith("\n\n") ? "" : before.endsWith("\n") ? "\n" : "\n\n"
        return `${before}${lead}${markdown}\n\n${current.slice(at).replace(/^\n+/, "")}`
      })
      setImages((current) => [...current, ...added])
    }
    setUploading(false)
  }

  function imageFiles(list: FileList | null | undefined): File[] {
    return Array.from(list ?? []).filter((file) => file.type.startsWith("image/"))
  }

  function handlePaste(event: React.ClipboardEvent) {
    const files = imageFiles(event.clipboardData.files)
    if (files.length === 0) return
    event.preventDefault()
    addImages(files)
  }

  function handleDrop(event: React.DragEvent) {
    const files = imageFiles(event.dataTransfer.files)
    if (files.length === 0) return
    event.preventDefault()
    addImages(files)
  }

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
        // Images whose Markdown line was removed are simply not committed.
        images: images
          .filter((image) => content.includes(imagePath(image.name)))
          .map(({ name, sha }) => ({ name, sha })),
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
          disabled={slugLocked}
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
        Content (Markdown) — paste or drop images straight into the text
        <Textarea
          ref={contentRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onPaste={handlePaste}
          onDrop={handleDrop}
          className="min-h-96 font-mono"
          required
        />
      </label>

      <div className="flex items-center gap-3">
        <Button type="button" variant="outline" size="sm" disabled={uploading} onClick={() => fileInputRef.current?.click()}>
          Add image or GIF
        </Button>
        <span className="text-xs text-gray-500">PNG, JPEG, GIF or WebP, up to 3 MB each</span>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/gif,image/webp"
          multiple
          hidden
          onChange={(e) => {
            const files = imageFiles(e.target.files)
            e.target.value = ""
            if (files.length > 0) addImages(files)
          }}
        />
      </div>

      {uploading && <p className="text-sm text-gray-400">Uploading image...</p>}

      {images.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-sm text-gray-300">New images (published with the post)</p>
          <ul className="flex flex-wrap gap-3">
            {images.map((image) => {
              const used = content.includes(imagePath(image.name))
              return (
                <li key={image.name} className={`w-28 text-xs ${used ? "text-gray-400" : "text-gray-600"}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image.previewUrl}
                    alt={image.name}
                    className={`h-20 w-28 rounded-md border border-white/10 object-cover ${used ? "" : "opacity-40"}`}
                  />
                  <p className="mt-1 truncate">{image.name}</p>
                  {!used && <p>not used, will be skipped</p>}
                </li>
              )
            })}
          </ul>
        </div>
      )}

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="flex gap-2">
        <Button type="submit" disabled={saving || uploading}>
          {saving ? "Saving..." : isEdit ? "Save changes" : "Publish"}
        </Button>
        <Button asChild variant="outline">
          <Link href="/admin">Cancel</Link>
        </Button>
      </div>
    </form>
  )
}
