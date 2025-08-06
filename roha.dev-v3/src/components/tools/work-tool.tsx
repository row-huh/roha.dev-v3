import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Briefcase } from "lucide-react"

export default function WorkTool() {
  return (
    <Link href="/projects" passHref>
      <Button
        variant="outline"
        className="w-full justify-start border-gray-700 text-gray-300 hover:bg-gray-700 rounded-lg bg-gray-800/50"
      >
        <Briefcase className="mr-2 h-4 w-4" />
        View My Work
      </Button>
    </Link>
  )
}
