import HomeTool from "./tools/home-tool"
import WorkTool from "./tools/work-tool"
import WritingTool from "./tools/writing-tool"
import ContactTool from "./tools/contact-tool"

interface ToolRendererProps {
  toolName: string
}

export default function ToolRenderer({ toolName }: ToolRendererProps) {
  switch (toolName) {
    case "home":
      return <HomeTool />
    case "work":
      return <WorkTool />
    case "writing":
      return <WritingTool />
    case "contact":
      return <ContactTool />
    default:
      return null
  }
}
