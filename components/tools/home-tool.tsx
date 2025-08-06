import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HomeIcon } from "lucide-react"

export default function HomeTool() {
  return (
    <Link href="/" passHref>
      <Button
        variant="outline"
        className="w-full justify-start border-gray-700 text-gray-300 hover:bg-gray-700 rounded-lg bg-gray-800/50"
      >
        <HomeIcon className="mr-2 h-4 w-4" />
        Go to Home
      </Button>
    </Link>
  )
}
