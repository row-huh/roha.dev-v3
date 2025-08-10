import ResumeTool from "@/components/tools/resume-tool"
import SkillsTool from "@/components/tools/skills-tool"
import SocialTool from "@/components/tools/social-tool"

interface ToolRendererProps {
  toolName: "resume" | "skills" | "social"
}

export default function ToolRenderer({ toolName }: ToolRendererProps) {
  switch (toolName) {
    case "resume":
      return <ResumeTool />
    case "skills":
      return <SkillsTool />
    case "social":
      return <SocialTool />
    default:
      return null
  }
}
