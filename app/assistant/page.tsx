"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Send, ArrowLeft, MessageCircle } from "lucide-react"
import Link from "next/link"
import AnimatedBackground from "@/components/animated-background"

export default function AssistantPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm Roha's AI assistant. I can help you learn about Roha's work, discuss AI concepts, or answer any questions you might have. What would you like to know?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")

  const handleSend = () => {
    if (!inputValue.trim()) return

    const newMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user" as const,
      timestamp: new Date(),
    }

    setMessages([...messages, newMessage])
    setInputValue("")

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "That's a fascinating question about Roha's work. Their approach to building LLMs from scratch has been particularly innovative, focusing on understanding the fundamental mechanisms rather than just implementation.",
        "Roha's background in full-stack development gives them a unique perspective on AI engineering. They think about the entire user experience, not just the model performance.",
        "I'd be happy to elaborate on that. Roha's current project involves building transformer architectures from the ground up, which has given them deep insights into attention mechanisms and training dynamics.",
        "Great question! Roha believes in making AI accessible and understandable. Their work focuses on bridging the gap between complex AI research and practical applications.",
      ]

      const aiResponse = {
        id: messages.length + 2,
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: "assistant" as const,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiResponse])
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <AnimatedBackground />

      {/* Header */}
      <div className="bg-gray-900/80 backdrop-blur-md border-b border-gray-800 relative z-10">
        <div className="max-w-4xl mx-auto px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/">
                <Button variant="ghost" className="text-gray-300 hover:text-white">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-semibold text-white">AI Assistant</h1>
                  <p className="text-gray-300">Ask me about Roha's work and AI</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-400">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              Online
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="max-w-4xl mx-auto px-8 py-12 flex flex-col h-[calc(100vh-200px)] relative z-10">
        <div className="flex-1 overflow-y-auto space-y-8 mb-8">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex gap-4 max-w-2xl ${message.sender === "user" ? "flex-row-reverse" : ""}`}>
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                    message.sender === "user" ? "bg-gray-700" : "bg-gradient-to-br from-purple-500 to-pink-500"
                  }`}
                >
                  {message.sender === "user" ? (
                    <div className="w-5 h-5 bg-gray-400 rounded-full" />
                  ) : (
                    <MessageCircle className="h-5 w-5 text-white" />
                  )}
                </div>

                <Card
                  className={`p-6 border-0 rounded-3xl backdrop-blur-sm ${
                    message.sender === "user" ? "bg-purple-600 text-white" : "bg-gray-800/50 border-gray-700"
                  }`}
                >
                  <p className={`leading-relaxed ${message.sender === "user" ? "text-white" : "text-gray-100"}`}>
                    {message.text}
                  </p>
                  <p className={`text-xs mt-3 ${message.sender === "user" ? "text-purple-100" : "text-gray-400"}`}>
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input Area */}
        <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 p-6 rounded-3xl">
          <div className="flex gap-4 mb-4">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me about Roha's projects, AI concepts, or anything else..."
              className="flex-1 border-0 bg-gray-700/50 rounded-2xl px-6 py-4 text-base text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
            />
            <Button onClick={handleSend} className="bg-purple-600 hover:bg-purple-700 text-white rounded-2xl px-6 py-4">
              <Send className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-300 hover:bg-gray-700 rounded-full bg-transparent"
              onClick={() => setInputValue("Tell me about the LLM project")}
            >
              LLM Project
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-300 hover:bg-gray-700 rounded-full bg-transparent"
              onClick={() => setInputValue("What's Roha's AI background?")}
            >
              AI Background
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-300 hover:bg-gray-700 rounded-full bg-transparent"
              onClick={() => setInputValue("How can I collaborate with Roha?")}
            >
              Collaboration
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
