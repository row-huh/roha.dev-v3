import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen } from "lucide-react"

export default function WritingTool() {
  return (
    <Link href="/writing" passHref>
      <Button
        variant="outline"
        className="w-full justify-start border-gray-700 text-gray-300 hover:bg-gray-700 rounded-lg bg-gray-800/50"
      >
        <BookOpen className="mr-2 h-4 w-4" />
        Read My Writing
      </Button>
    </Link>
  )
}
