"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Send, MessageSquare } from "lucide-react"
import { useRouter } from "next/navigation"

interface AIAssistantPreviewProps {
  compact?: boolean
}

export default function AIAssistantPreview({ compact = false }: AIAssistantPreviewProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const router = useRouter()

  const sampleMessages = [
    "What's Roha working on with LLMs?",
    "Tell me about transformer architectures",
    "How does attention mechanism work?",
  ]

  const handleEnterChat = () => {
    router.push("/assistant")
  }

  if (compact) {
    return (
      <div className="flex items-center gap-2 mt-4">
        <div className="bg-purple-600/20 text-purple-300 text-sm font-semibold flex-shrink-0 px-3 py-1 rounded-full">
          Pethia
        </div>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="I'm an AI assistant. Ask me anything about Roha..."
          className="flex-1 border-gray-600 bg-gray-700/50 rounded-full px-4 py-2 text-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
          onKeyPress={(e) => e.key === "Enter" && handleEnterChat()}
        />
        <Button
          onClick={handleEnterChat}
          className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-3 py-2 h-auto"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      {" "}
      {/* Changed to max-w-7xl for horizontal width */}
      <Card
        className="bg-gray-800/20 border-gray-700/30 backdrop-blur-md rounded-3xl overflow-hidden hover:bg-gray-800/30 transition-all duration-500"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="px-12 py-4">
          {" "}
          {/* Adjusted padding for wider content */}
          {/* Left Side - Description */}
          <div className="flex items-center justify-between gap-4">
            {" "}
            {/* Reduced gap for more horizontal space */}
            <div className="flex items-center gap-4 bg-purple-600 rounded-2xl py-2 px-4">
              {" "}
              {/* Adjusted vertical padding to match input */}
              <div className="w-12 h-12 bg-purple-800 rounded-2xl flex items-center justify-center flex-shrink-0">
                {" "}
                {/* Changed background to solid purple-800 */}
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-medium text-white">Pethia AI</h3>
                {/* Removed "Your AI companion" paragraph */}
              </div>
            </div>
            <div className="flex gap-4 flex-shrink-0 flex-grow">
              {" "}
              {/* Added flex-grow to allow input to take more space */}
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Say hi"
                className="flex-1 border-gray-600 bg-gray-700/50 rounded-full px-6 py-2 text-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
                onKeyPress={(e) => e.key === "Enter" && handleEnterChat()}
              />
              <Button
                onClick={handleEnterChat}
                className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-3 py-2 h-auto"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
