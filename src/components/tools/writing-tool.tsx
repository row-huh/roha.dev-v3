"use client"

import { BookOpen } from 'lucide-react'
import { ToolCard } from "../tool-card"

export default function WritingTool() {
  return <ToolCard href="/writing" title="Writing" icon={<BookOpen className="h-5 w-5 text-white" />} />
}
