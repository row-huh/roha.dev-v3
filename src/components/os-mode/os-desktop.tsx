"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { AnimatePresence } from "framer-motion"
import { User, FolderGit2, BookOpen, Mail, FileText, Power, Terminal, Sprout } from "lucide-react"
import OsWindow from "./os-window"
import { useOsMode } from "./os-mode-context"
import FastFetch from "./apps/fastfetch"
import AboutApp from "./apps/about-app"
import WorkApp from "./apps/work-app"
import WritingFolder from "./apps/writing-folder"
import ContactApp from "./apps/contact-app"
import PdfViewer from "./apps/pdf-viewer"

type AppId = "fastfetch" | "about" | "work" | "writing" | "contact" | "pdf"

interface WinState {
  id: string
  appId: AppId
  title: string
  slug?: string
  z: number
  minimized: boolean
  maximized: boolean
  initial: { x: number; y: number; width: number; height: number }
}

const APP_META: Record<
  Exclude<AppId, "pdf">,
  { title: string; icon: React.ReactNode; size: { width: number; height: number } }
> = {
  fastfetch: { title: "roha@portfolio — fastfetch", icon: <Terminal className="h-3.5 w-3.5" />, size: { width: 660, height: 470 } },
  about: { title: "About — Roha", icon: <User className="h-3.5 w-3.5" />, size: { width: 560, height: 480 } },
  work: { title: "Work", icon: <FolderGit2 className="h-3.5 w-3.5" />, size: { width: 700, height: 480 } },
  writing: { title: "Writing", icon: <BookOpen className="h-3.5 w-3.5" />, size: { width: 560, height: 420 } },
  contact: { title: "Contact", icon: <Mail className="h-3.5 w-3.5" />, size: { width: 560, height: 560 } },
}

const DESKTOP_ICONS: { appId: Exclude<AppId, "pdf">; label: string; icon: React.ReactNode }[] = [
  { appId: "fastfetch", label: "whoami", icon: <Terminal className="h-7 w-7" strokeWidth={1.6} /> },
  { appId: "about", label: "About", icon: <User className="h-7 w-7" strokeWidth={1.6} /> },
  { appId: "work", label: "Work", icon: <FolderGit2 className="h-7 w-7" strokeWidth={1.6} /> },
  { appId: "writing", label: "Writing", icon: <BookOpen className="h-7 w-7" strokeWidth={1.6} /> },
  { appId: "contact", label: "Contact", icon: <Mail className="h-7 w-7" strokeWidth={1.6} /> },
]

function Clock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000 * 30)
    return () => clearInterval(t)
  }, [])
  return (
    <span className="tabular-nums">
      {now.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}{"  "}
      {now.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}
    </span>
  )
}

export default function OsDesktop() {
  const { setOsMode } = useOsMode()
  const [windows, setWindows] = useState<WinState[]>([])
  const zCounter = useRef(10)
  const workAreaRef = useRef<HTMLDivElement>(null)

  const focusWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, z: ++zCounter.current, minimized: false } : w))
    )
  }, [])

  const openApp = useCallback((appId: Exclude<AppId, "pdf">) => {
    setWindows((prev) => {
      const existing = prev.find((w) => w.appId === appId)
      if (existing) {
        return prev.map((w) =>
          w.id === existing.id ? { ...w, z: ++zCounter.current, minimized: false } : w
        )
      }
      const meta = APP_META[appId]
      const count = prev.length
      const offset = count * 28
      const centerX =
        typeof window !== "undefined" ? Math.max(40, (window.innerWidth - meta.size.width) / 2) : 120
      return [
        ...prev,
        {
          id: `${appId}-${Date.now()}`,
          appId,
          title: meta.title,
          z: ++zCounter.current,
          minimized: false,
          maximized: false,
          initial: {
            x: count === 0 ? centerX : 90 + offset,
            y: count === 0 ? 50 : 40 + offset,
            ...meta.size,
          },
        },
      ]
    })
  }, [])

  // Boot straight into the fastfetch intro.
  useEffect(() => {
    openApp("fastfetch")
  }, [openApp])

  const openPost = useCallback((slug: string, title: string) => {
    setWindows((prev) => {
      const existing = prev.find((w) => w.appId === "pdf" && w.slug === slug)
      if (existing) {
        return prev.map((w) =>
          w.id === existing.id ? { ...w, z: ++zCounter.current, minimized: false } : w
        )
      }
      const offset = prev.length * 28
      return [
        ...prev,
        {
          id: `pdf-${slug}-${Date.now()}`,
          appId: "pdf",
          slug,
          title: `${title}.pdf`,
          z: ++zCounter.current,
          minimized: false,
          maximized: false,
          initial: { x: 140 + offset, y: 30 + offset, width: 680, height: 600 },
        },
      ]
    })
  }, [])

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id))
  }, [])

  const minimizeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, minimized: true } : w)))
  }, [])

  const toggleMaximize = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, maximized: !w.maximized, z: ++zCounter.current } : w))
    )
  }, [])

  const topZ = Math.max(10, ...windows.map((w) => w.z))

  const renderContent = (w: WinState) => {
    switch (w.appId) {
      case "fastfetch":
        return <FastFetch />
      case "about":
        return <AboutApp />
      case "work":
        return <WorkApp />
      case "writing":
        return <WritingFolder onOpenPost={openPost} />
      case "contact":
        return <ContactApp />
      case "pdf":
        return <PdfViewer slug={w.slug!} />
    }
  }

  const iconFor = (w: WinState) =>
    w.appId === "pdf" ? <FileText className="h-3.5 w-3.5" /> : APP_META[w.appId].icon

  const minimized = windows.filter((w) => w.minimized)

  return (
    <div className="os-pixel fixed inset-0 z-[100] select-none overflow-hidden text-[#3b2f1e]">
      {/* Wallpaper — cottagecore meadow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#ecd9b3] via-[#d7cf9e] to-[#9fb06a]" />
      {/* soft rolling hill */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[#8fa15e]/60 [clip-path:ellipse(120%_100%_at_50%_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/4 bg-[#7c9050]/50 [clip-path:ellipse(140%_100%_at_30%_100%)]" />
      {/* pixel farmer mascot */}
      <img
        src="/overlays/village-hero.png"
        alt=""
        aria-hidden
        className="pixelated pointer-events-none absolute bottom-0 right-4 h-[58%] w-auto opacity-95 drop-shadow-[3px_3px_0_rgba(47,38,22,0.25)] sm:right-16 md:right-28"
      />

      {/* Top menu bar */}
      <div className="absolute inset-x-0 top-0 z-[200] flex h-9 items-center justify-between border-b-2 border-[#2f2616] bg-[#d8c39a] px-3 text-[13px] text-[#3b2f1e]">
        <div className="flex items-center gap-2">
          <Sprout className="h-4 w-4 text-[#5c7a38]" strokeWidth={2} />
          <span className="font-semibold">roha.os</span>
          <span className="hidden text-[#6b5b43] sm:inline">~ village</span>
        </div>
        <div className="flex items-center gap-3">
          <Clock />
          <button
            onClick={() => setOsMode(false)}
            className="flex items-center gap-1.5 rounded-none border-2 border-[#2f2616] bg-[#c2703d] px-2 py-0.5 text-[#2f2616] transition-colors hover:bg-[#d4824e]"
          >
            <Power className="h-3 w-3" strokeWidth={2.5} /> Exit
          </button>
        </div>
      </div>

      {/* Work area (desktop icons + windows; drag constraints) */}
      <div ref={workAreaRef} className="absolute inset-x-0 bottom-0 top-9">
        {/* Desktop icons */}
        <div className="absolute left-3 top-3 flex flex-col gap-3">
          {DESKTOP_ICONS.map((d) => (
            <button
              key={d.appId}
              onDoubleClick={() => openApp(d.appId)}
              onClick={(e) => {
                if (e.detail === 1) openApp(d.appId)
              }}
              className="group flex w-[72px] flex-col items-center gap-1.5 text-center"
            >
              <span className="os-shadow-sm flex h-12 w-12 items-center justify-center rounded-none border-2 border-[#2f2616] bg-[#ece6d6] text-[#5c7a38] transition-transform group-hover:-translate-y-0.5 group-active:translate-y-0">
                {d.icon}
              </span>
              <span className="rounded-none border-2 border-[#2f2616] bg-[#ece6d6] px-1.5 py-0.5 text-[11px] leading-none text-[#3b2f1e]">
                {d.label}
              </span>
            </button>
          ))}
        </div>

        {/* Windows */}
        <AnimatePresence>
          {windows
            .filter((w) => !w.minimized)
            .map((w) => (
              <OsWindow
                key={w.id}
                title={w.title}
                icon={iconFor(w)}
                zIndex={w.z}
                focused={w.z === topZ}
                maximized={w.maximized}
                initial={w.initial}
                constraintsRef={workAreaRef}
                onFocus={() => focusWindow(w.id)}
                onClose={() => closeWindow(w.id)}
                onMinimize={() => minimizeWindow(w.id)}
                onToggleMaximize={() => toggleMaximize(w.id)}
              >
                {renderContent(w)}
              </OsWindow>
            ))}
        </AnimatePresence>

        {/* Minimized windows — floating chips, only when needed (no persistent taskbar) */}
        <AnimatePresence>
          {minimized.length > 0 && (
            <div className="os-shadow absolute bottom-4 left-1/2 z-[200] flex -translate-x-1/2 items-center gap-1.5 rounded-none border-2 border-[#2f2616] bg-[#d8c39a] px-1.5 py-1.5">
              {minimized.map((w) => (
                <button
                  key={w.id}
                  onClick={() => focusWindow(w.id)}
                  className="flex items-center gap-1.5 rounded-none border-2 border-[#2f2616] bg-[#ece6d6] px-2 py-1 text-[12px] text-[#3b2f1e] transition-colors hover:bg-[#f3eedd]"
                  title={w.title}
                >
                  <span className="text-[#5c7a38]">{iconFor(w)}</span>
                  <span className="max-w-[120px] truncate">{w.title}</span>
                </button>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
