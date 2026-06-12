"use client"

import { createContext, useContext, useEffect, useState, useCallback } from "react"
import OsDesktop from "./os-desktop"

const STORAGE_KEY = "roha-os-mode"

interface OsModeContextValue {
  osMode: boolean
  mounted: boolean
  setOsMode: (v: boolean) => void
  toggle: () => void
}

const OsModeContext = createContext<OsModeContextValue | null>(null)

export function useOsMode() {
  const ctx = useContext(OsModeContext)
  if (!ctx) throw new Error("useOsMode must be used within OsModeProvider")
  return ctx
}

export function OsModeProvider({ children }: { children: React.ReactNode }) {
  const [osMode, setOsModeState] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Hydrate from localStorage after mount (avoids SSR mismatch).
  useEffect(() => {
    setMounted(true)
    try {
      if (localStorage.getItem(STORAGE_KEY) === "true") {
        setOsModeState(true)
      }
    } catch {
      /* ignore */
    }
  }, [])

  // Persist + lock background scroll while the desktop is active.
  useEffect(() => {
    if (!mounted) return
    try {
      localStorage.setItem(STORAGE_KEY, String(osMode))
    } catch {
      /* ignore */
    }
    document.body.style.overflow = osMode ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [osMode, mounted])

  const setOsMode = useCallback((v: boolean) => setOsModeState(v), [])
  const toggle = useCallback(() => setOsModeState((v) => !v), [])

  return (
    <OsModeContext.Provider value={{ osMode, mounted, setOsMode, toggle }}>
      {children}
      {mounted && osMode && <OsDesktop />}
    </OsModeContext.Provider>
  )
}
