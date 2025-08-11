"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send } from 'lucide-react'

/**
 * Homepage assistant preview input.
 * - Stores the draft in sessionStorage under "pethia:initial"
 * - On Enter or Send, sets "pethia:auto" and routes to /assistant
 */
export default function AIAssistantPreview() {
  const router = useRouter()
  const [value, setValue] = useState<string>("")

  const handleChange = (next: string) => {
    setValue(next)
  }

  const goAsk = (auto = false) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("pethia:initial", value.trim())
      if (auto) sessionStorage.setItem("pethia:auto", "1")
    }
    router.push(value.trim() ? `/assistant?q=${encodeURIComponent(value.trim())}${auto ? "&auto=1" : ""}` : "/assistant")
  }

  return (
    <div className="w-full max-w-xl">
      <div className="rounded-2xl ring-1 ring-white/15 bg-white/[0.06] backdrop-blur-xl p-1.5">
        <div className="flex items-center gap-2">
          <Input
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Ask about projects, writing, or AI…"
            className="h-12 flex-1 rounded-xl border-white/10 bg-white/[0.06] text-gray-100 placeholder:text-gray-300/70
                       focus-visible:ring-purple-500/60"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                goAsk(true) // auto send on assistant
              }
            }}
          />
          <Button
            type="button"
            onClick={() => goAsk(true)}
            className="h-12 rounded-xl bg-purple-600 px-4 text-white hover:bg-purple-500"
            aria-label="Ask Pethia"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
