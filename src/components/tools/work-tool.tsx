"use client"

import { Briefcase } from 'lucide-react'
import { ToolCard } from "../tool-card"

export default function WorkTool() {
  return <ToolCard href="/projects" title="Work" icon={<Briefcase className="h-5 w-5 text-white" />} />
}
