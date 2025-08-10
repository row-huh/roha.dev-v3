"use client"

import { Music } from "lucide-react"
import { ToolCard } from "../tool-card"

interface SpotifyToolProps {
  spotifyUrl: string
  nowPlayingTitle: string
  nowPlayingArtist: string
}

export default function SpotifyTool({ spotifyUrl, nowPlayingTitle, nowPlayingArtist }: SpotifyToolProps) {
  return (
    <>
      <ToolCard href="#" title="Spotify" icon={<Music className="h-5 w-5 text-white" />} />
      <p className="text-white text-sm mt-1">
        Now Playing: {nowPlayingTitle} — {nowPlayingArtist}.{" "}
        <a href={spotifyUrl} target="_blank" rel="noopener noreferrer" className="underline text-blue-400">
          Listen on Spotify
        </a>
      </p>
    </>
  )
}
