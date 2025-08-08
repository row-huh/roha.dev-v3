"use client"

import { Home } from 'lucide-react'
import { ToolCard } from "../tool-card"

export default function HomeTool() {
  return <ToolCard href="/" title="Home" icon={<Home className="h-5 w-5 text-white" />} />
}
