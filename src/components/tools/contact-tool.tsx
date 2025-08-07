import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"

export default function ContactTool() {
  return (
    <Link href="/contact" passHref>
      <Button
        variant="outline"
        className="w-full justify-start border-gray-700 text-gray-300 hover:bg-gray-700 rounded-lg bg-gray-800/50"
      >
        <Mail className="mr-2 h-4 w-4" />
        Get in Touch
      </Button>
    </Link>
  )
}
