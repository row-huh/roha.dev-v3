import AnimatedBackground from "@/components/interactive-background"

export default function Loading() {
  return (
    <div className="relative min-h-screen bg-gray-950 text-gray-100">
      <AnimatedBackground />
      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-purple-400" />
          <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-purple-400 [animation-delay:150ms]" />
          <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-purple-400 [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  )
}
