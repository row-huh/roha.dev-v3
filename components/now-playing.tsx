"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, SkipForward, Volume2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function NowPlaying() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const currentTrack = {
    title: "Resonance",
    artist: "HOME",
    album: "Odyssey",
    duration: "3:32",
    progress: 45,
  }

  return (
    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative">
      <Card
        className="bg-gray-900/80 border-gray-700 backdrop-blur-md p-4 cursor-pointer hover:border-purple-500/50 transition-all duration-300"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Volume2 className="h-5 w-5 text-white" />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-white font-medium text-sm truncate">Now Playing</p>
            <p className="text-gray-400 text-xs truncate">{currentTrack.title}</p>
          </div>

          <Button
            size="sm"
            variant="ghost"
            className="text-purple-400 hover:text-white hover:bg-purple-500/20"
            onClick={(e) => {
              e.stopPropagation()
              setIsPlaying(!isPlaying)
            }}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-4 border-t border-gray-700 mt-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-white font-medium">{currentTrack.title}</p>
                    <p className="text-gray-400 text-sm">{currentTrack.artist}</p>
                  </div>
                  <p className="text-gray-400 text-sm">{currentTrack.duration}</p>
                </div>

                <div className="w-full bg-gray-700 rounded-full h-1 mb-3">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-1 rounded-full transition-all duration-300"
                    style={{ width: `${currentTrack.progress}%` }}
                  />
                </div>

                <div className="flex items-center justify-center gap-2">
                  <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                    <SkipForward className="h-4 w-4 rotate-180" />
                  </Button>
                  <Button
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                    <SkipForward className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  )
}
