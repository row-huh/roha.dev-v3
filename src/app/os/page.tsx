"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useOsMode } from "@/components/os-mode/os-mode-context"

// Hidden entry point: visiting /os flips on the desktop "OS" experience.
// There is no UI toggle anywhere — this URL is the only way in.
// The desktop overlay (rendered by OsModeProvider) takes over the whole
// viewport, so we send the user back to the homepage underneath it.
export default function OsEntryPage() {
  const { setOsMode } = useOsMode()
  const router = useRouter()

  useEffect(() => {
    setOsMode(true)
    router.replace("/")
  }, [setOsMode, router])

  return null
}
