"use client"


import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send } from 'lucide-react'

/**
 * Homepage assistant preview input.
 * - Stores the draft in sessionStorage under "pethia:initial"
 * - On Enter or Send, sets "pethia:auto" and routes to /assistant
 */
type AIAssistantPreviewProps = {
  align?: "left" | "center"
}

export default function AIAssistantPreview({ align = "center" }: AIAssistantPreviewProps) {
  const router = useRouter()
  const [value, setValue] = useState<string>("")

  const suggestions = useMemo(
    () => [
      "Show me recent projects",
      "Show me her resume",
      "What tools does Roha use?",
      "How can I contact Roha?",
      "What's her favorite song?",
    ],
    [],
  )

  const handleChange = (next: string) => {
    setValue(next)
  }

  const goAsk = (text?: string, auto = false) => {
    const payload = (text ?? value).trim()
    if (typeof window !== "undefined") {
      sessionStorage.setItem("pethia:initial", payload)
      if (auto) sessionStorage.setItem("pethia:auto", "1")
    }
    router.push(payload ? `/assistant?q=${encodeURIComponent(payload)}${auto ? "&auto=1" : ""}` : "/assistant")
  }

  return (
    <div className={`w-full max-w-xl ${align === "center" ? "mx-auto" : "mx-0"}`}>
      <div className="rounded-2xl ring-1 ring-[var(--v-border)]/15 bg-[var(--v-paper)]/6 backdrop-blur-xl px-3 py-2 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.35)]">
        <div className="flex items-center gap-2">
          <Input
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Ask my AI anything or just say hi!"
            className="h-12 flex-1 rounded-xl border-[var(--v-border)]/10 bg-[var(--v-paper)]/6 text-[var(--v-ink)] placeholder:text-[var(--v-ink-soft)]/70
                       focus-visible:ring-[var(--v-clay)]/60"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                goAsk(undefined, true) // auto send on assistant
              }
            }}
          />
          <Button
            type="button"
            onClick={() => goAsk(undefined, true)}
            className="h-12 rounded-xl bg-[var(--v-clay)] px-4 text-[var(--v-ink)] hover:bg-[var(--v-clay)]"
            aria-label="Ask Pethia"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        <div className={`mt-2 flex flex-wrap ${align === "center" ? "justify-center" : "justify-start"} gap-2`}>
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => goAsk(s, true)}
              className="rounded-full px-3 py-1 text-xs text-[var(--v-ink)] ring-1 ring-[var(--v-border)]/15 bg-[var(--v-paper)]/6 backdrop-blur-md hover:bg-[var(--v-paper)]/8 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
