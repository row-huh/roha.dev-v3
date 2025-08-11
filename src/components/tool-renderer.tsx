import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Download, Github, Linkedin, Twitter, MessageCircle, Mail, PhoneCall } from "lucide-react"
import ResumeTool from "./tools/resume-tool"

interface ToolRendererProps {
  toolName: "resume" | "skills" | "social"
}

export default function ToolRenderer({ toolName }: ToolRendererProps) {
  if (toolName === "resume") {
    return (
      <ResumeTool/>
    )
  }

  if (toolName === "skills") {
    const skillCategories = [
      {
        title: "Frontend",
        skills: ["Next.js", "React", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS"],
      },
      {
        title: "Backend",
        skills: ["Python", "Django", "Flask", "Java", "C", "C++"],
      },
      {
        title: "Databases",
        skills: ["MySQL", "Oracle SQL", "PostgreSQL", "SQLite", "MongoDB", "Supabase"],
      },
      {
        title: "AI/ML",
        skills: ["Vertex AI", "RAG", "LLMs", "Agentic AI", "Machine Learning"],
      },
      {
        title: "Tools",
        skills: ["Git", "GitHub", "Vercel", "Selenium", "Beautiful Soup"],
      },
      {
        title: "Concepts",
        skills: ["OOP", "DSA", "System Design", "Software Development"],
      },
    ]

    return (
      <Card className="ring-1 ring-white/15 bg-white/[0.06] backdrop-blur-md border-white/10">
        <CardContent className="p-6">
          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-white mb-2">Technical Skills</h3>
            <p className="text-gray-300">Here's an overview of my technical expertise across different domains.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category) => (
              <div key={category.title} className="space-y-3">
                <h4 className="text-lg font-medium text-white border-b border-white/20 pb-2">{category.title}</h4>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-sm bg-white/[0.08] ring-1 ring-white/15 rounded-full text-gray-200 backdrop-blur-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (toolName === "social") {
    const socialLinks = [
{
  name: "Twitter/X",
  handle: "@rokage_125",
  url: "https://twitter.com/rokage_125",
  icon: Twitter,
  color: "hover:bg-gradient-to-r hover:from-purple-700 hover:to-indigo-800/40",
},
{
  name: "LinkedIn",
  handle: "roha-pathan",
  url: "https://www.linkedin.com/in/roha-pathan-687960272/",
  icon: Linkedin,
  color: "hover:bg-gradient-to-r hover:from-purple-800 hover:to-indigo-900/40",
},
{
  name: "GitHub",
  handle: "row-huh",
  url: "https://github.com/row-huh",
  icon: Github,
  color: "hover:bg-gradient-to-r hover:from-violet-800 hover:to-purple-900/40",
},
{
  name: "Discord",
  handle: "@bababooey9753",
  url: "https://discord.com/users/bababooey9753",
  icon: MessageCircle,
  color: "hover:bg-gradient-to-r hover:from-purple-700 hover:to-pink-900/40",
},
{
  name: "Medium",
  handle: "@roha-pathan125",
  url: "https://medium.com/@roha-pathan125",
  icon: ExternalLink,
  color: "hover:bg-gradient-to-r hover:from-fuchsia-800 hover:to-purple-900/40",
},
{
  name: "Mail",
  handle: "roha.pathan125@gmail.com",
  url: "mailto:roha.pathan125@gmail.com",
  icon: Mail,
  color: "hover:bg-gradient-to-r hover:from-purple-900 hover:to-indigo-900/40",
},
{
  name: "Phone",
  handle: "+92 325 7007071",
  url: "#",
  icon: PhoneCall,
  color: "hover:bg-gradient-to-r hover:from-indigo-800 hover:to-purple-900/40",
},

    ]

    return (
      <Card className="ring-1 ring-white/15 bg-white/[0.06] backdrop-blur-md border-white/10">
        <CardContent className="p-6">
          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-white mb-2">Connect with Roha</h3>
            <p className="text-gray-300">Find me on these platforms to stay updated with my work and connect.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center gap-3 p-4 rounded-xl ring-1 ring-white/15 bg-white/[0.04] backdrop-blur-sm transition-all duration-200 ${social.color} hover:ring-white/25`}
                >
                  <div className="flex-shrink-0">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-medium text-sm">{social.name}</div>
                    <div className="text-gray-400 text-xs truncate">{social.handle}</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                </a>
              )
            })}
          </div>
        </CardContent>
      </Card>
    )
  }

  return null
}
