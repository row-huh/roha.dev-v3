"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Send, ArrowLeft } from "lucide-react"
import Link from "next/link"
import InteractiveBackground from "@/components/interactive-background"
import ToolRenderer from "@/components/tool-renderer"
import { generateText } from "ai"
import { google } from "@ai-sdk/google"

interface Message {
  id: number
  text: string
  sender: "user" | "assistant"
  timestamp: Date
  toolName?: string // Added optional toolName property
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm Pethia, Roha's AI. I can help you learn about Roha's work, discuss AI concepts, or answer any questions you might have. What would you like to know?",
      sender: "assistant",
      timestamp: new Date(),
      toolName: "writing", // Display WritingTool by default
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const suggestedQuestions = [
    "Tell me about Roha's latest project.",
    "What's Roha's expertise in AI?",
    "How does Roha approach problem-solving?",
    "Can you explain large language models?",
    "What is transformer architecture?",
  ]

  const handleSend = async (messageText = inputValue) => {
    if (!messageText.trim() || isLoading) return

    const newMessage: Message = {
      id: messages.length + 1,
      text: messageText,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      const { text } = await generateText({
        model: google("models/gemini-2.0-flash-exp"),
        prompt: `The user is asking about Roha, a full-stack developer and AI engineer. Provide a concise and helpful answer based on the following general knowledge about Roha:
        - Roha builds LLMs from scratch, focusing on fundamental mechanisms.
        - Roha has a strong background in full-stack development, bringing a unique perspective to AI engineering, thinking about the entire user experience.
        - Roha's current projects involve building transformer architectures from the ground up.
        - Roha aims to make AI accessible and understandable, bridging research and practical applications.
        - Roha is interested in collaboration.

        User query: ${messageText}`,
      })

      const aiResponse: Message = {
        id: messages.length + 2,
        text: text,
        sender: "assistant",
        timestamp: new Date(),
        toolName: "writing"
      }

      setMessages((prev) => [...prev, aiResponse])
    } catch (error) {
      console.error("Error generating AI response:", error)
      setMessages((prev) => [
        ...prev,
        {
          id: messages.length + 2,
          text: "Oops! Something went wrong. Please try again.",
          sender: "assistant",
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsLoading(false)``
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      < InteractiveBackground />

      {/* Header */}
      <div className="bg-gray-900/80 backdrop-blur-md border-b border-gray-800 relative z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" className="text-gray-300 hover:text-white px-3 py-2">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center">
                <h1 className="text-xl font-semibold text-white">Pethia</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col h-[calc(100vh-140px)] relative z-10">
        <div className="flex-1 overflow-y-auto space-y-6 mb-6">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex gap-3 max-w-2xl ${message.sender === "user" ? "flex-row-reverse" : ""}`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                    message.sender === "user" ? "bg-gray-700 text-white" : "bg-purple-600 text-white"
                  }`}
                >
                  {message.sender === "user" ? "You" : "AI"}
                </div>
                <Card
                  className={`p-4 border-0 rounded-2xl backdrop-blur-sm ${
                    message.sender === "user" ? "bg-purple-600 text-white" : "bg-gray-800/50 border-gray-700"
                  }`}
                >
                  <p
                    className={`leading-relaxed text-sm ${message.sender === "user" ? "text-white" : "text-gray-100"}`}
                  >
                    {message.text}
                  </p>
                  <p className={`text-xs mt-2 ${message.sender === "user" ? "text-purple-100" : "text-gray-400"}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                  {message.toolName && (
                    <div className="mt-4">
                      {" "}
                      {/* Added margin-top for spacing */}
                      <ToolRenderer toolName={message.toolName} />
                    </div>
                  )}
                </Card>
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="flex justify-start"
            >
              <div className="flex gap-3 max-w-2xl">
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0 text-xs font-bold text-white">
                  AI
                </div>
                <Card className="p-4 border-0 rounded-2xl bg-gray-800/50 border-gray-700">
                  <p className="leading-relaxed text-sm text-gray-100 animate-pulse">...</p>
                </Card>
              </div>
            </motion.div>
          )}
        </div>
        {/* Suggested Questions */}
        <div className="flex flex-wrap gap-2 mb-4">
          {suggestedQuestions.map((question, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="border-gray-700 text-gray-300 hover:bg-gray-700 rounded-full bg-gray-800/50 text-xs px-3 py-1.5"
              onClick={() => handleSend(question)}
              disabled={isLoading}
            >
              {question}
            </Button>
          ))}
        </div>
        {/* Input Area */}
        <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 p-4 rounded-2xl">
          <div className="flex gap-3">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 border-0 bg-gray-700/50 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              disabled={isLoading}
            />
            <Button
              onClick={() => handleSend()}
              className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl px-4 py-3 h-auto"
              disabled={isLoading}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
