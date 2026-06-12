"use client"

import { motion, useDragControls } from "framer-motion"
import { Minus, X, Square } from "lucide-react"
import { useRef } from "react"

export interface OsWindowProps {
  title: string
  icon?: React.ReactNode
  zIndex: number
  focused: boolean
  maximized: boolean
  initial: { x: number; y: number; width: number; height: number }
  constraintsRef: React.RefObject<HTMLElement | null>
  onFocus: () => void
  onClose: () => void
  onMinimize: () => void
  onToggleMaximize: () => void
  children: React.ReactNode
}

export default function OsWindow({
  title,
  icon,
  zIndex,
  focused,
  maximized,
  initial,
  constraintsRef,
  onFocus,
  onClose,
  onMinimize,
  onToggleMaximize,
  children,
}: OsWindowProps) {
  const dragControls = useDragControls()
  const startedDrag = useRef(false)

  return (
    <motion.div
      drag={!maximized}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={constraintsRef}
      onMouseDownCapture={onFocus}
      initial={{ x: initial.x, y: initial.y, opacity: 0, scale: 0.97 }}
      animate={{
        x: maximized ? 0 : undefined,
        y: maximized ? 0 : undefined,
        opacity: 1,
        scale: 1,
      }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ type: "spring", stiffness: 460, damping: 34 }}
      style={{
        zIndex,
        width: maximized ? "100%" : initial.width,
        height: maximized ? "100%" : initial.height,
        position: "absolute",
        top: 0,
        left: 0,
      }}
      className={`os-pixel flex flex-col overflow-hidden rounded-none border-2 border-[#2f2616] bg-[#ece6d6] ${
        focused ? "os-shadow" : "os-shadow-sm opacity-95"
      }`}
    >
      {/* Title bar (drag handle) */}
      <div
        onPointerDown={(e) => {
          startedDrag.current = true
          if (!maximized) dragControls.start(e)
        }}
        onDoubleClick={onToggleMaximize}
        className={`flex h-9 shrink-0 cursor-default items-center justify-between gap-2 border-b-2 border-[#2f2616] px-2.5 ${
          focused ? "bg-[#d8c39a]" : "bg-[#cdbb93]"
        }`}
      >
        {/* Title */}
        <div className="flex min-w-0 items-center gap-1.5 truncate text-[13px] text-[#3b2f1e]">
          <span className="text-[#5c4a2c]">{icon}</span>
          <span className="truncate">{title}</span>
        </div>

        {/* Window controls — cute pixel squares */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onMinimize}
            onPointerDown={(e) => e.stopPropagation()}
            className="group flex h-4 w-4 items-center justify-center rounded-none border-2 border-[#2f2616] bg-[#c9a86a] transition-colors hover:bg-[#d9bd84]"
            aria-label="Minimize window"
          >
            <Minus className="h-2.5 w-2.5 text-[#2f2616] opacity-0 group-hover:opacity-100" strokeWidth={3} />
          </button>
          <button
            onClick={onToggleMaximize}
            onPointerDown={(e) => e.stopPropagation()}
            className="group flex h-4 w-4 items-center justify-center rounded-none border-2 border-[#2f2616] bg-[#8fa15e] transition-colors hover:bg-[#a3b572]"
            aria-label="Maximize window"
          >
            <Square className="h-2 w-2 text-[#2f2616] opacity-0 group-hover:opacity-100" strokeWidth={3} />
          </button>
          <button
            onClick={onClose}
            onPointerDown={(e) => e.stopPropagation()}
            className="group flex h-4 w-4 items-center justify-center rounded-none border-2 border-[#2f2616] bg-[#c2703d] transition-colors hover:bg-[#d4824e]"
            aria-label="Close window"
          >
            <X className="h-2.5 w-2.5 text-[#2f2616] opacity-0 group-hover:opacity-100" strokeWidth={3} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-[#ece6d6] text-[#3b2f1e]">
        {children}
      </div>
    </motion.div>
  )
}
