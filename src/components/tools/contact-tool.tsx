"use client"

import { Mail } from 'lucide-react'
import { ToolCard } from "../tool-card"


export default function ContactTool() {
  return <ToolCard href="/contact" title="Contact" icon={<Mail className="h-5 w-5 text-white" />} />
}
