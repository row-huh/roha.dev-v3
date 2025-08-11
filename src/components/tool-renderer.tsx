import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Download, Github, Linkedin, Twitter, MessageCircle } from "lucide-react"

interface ToolRendererProps {
  toolName: "resume" | "skills" | "social"
}

export default function ToolRenderer({ toolName }: ToolRendererProps) {
  if (toolName === "resume") {
    return (
      <Card className="ring-1 ring-white/15 bg-white/[0.06] backdrop-blur-md border-white/10">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Resume Preview */}
            <div className="flex-1">
              <div className="aspect-[8.5/11] bg-white rounded-lg shadow-lg overflow-hidden">
                <iframe src="/resume/resume.pdf" className="w-full h-full" title="Resume Preview" />
              </div>
            </div>

            {/* Resume Actions */}
            <div className="lg:w-64 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Resume</h3>
                <p className="text-gray-300 text-sm mb-4">
                  View my professional background, experience, and qualifications.
                </p>
              </div>

              <div className="space-y-3">
                <Button asChild className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                  <a
                    href="/resume/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Full Resume
                  </a>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="w-full ring-1 ring-white/15 bg-white/[0.06] text-white hover:bg-white/[0.08]"
                >
                  <a href="/resume/resume.pdf" download="Roha_Tyagi_Resume.pdf" className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download PDF
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
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
        handle: "@rohatyagi",
        url: "https://twitter.com/rohatyagi",
        icon: Twitter,
        color: "hover:bg-blue-500/20",
      },
      {
        name: "LinkedIn",
        handle: "roha-tyagi",
        url: "https://linkedin.com/in/roha-tyagi",
        icon: Linkedin,
        color: "hover:bg-blue-600/20",
      },
      {
        name: "GitHub",
        handle: "rohatyagi",
        url: "https://github.com/rohatyagi",
        icon: Github,
        color: "hover:bg-gray-500/20",
      },
      {
        name: "Discord",
        handle: "@bababooey9753",
        url: "#",
        icon: MessageCircle,
        color: "hover:bg-indigo-500/20",
      },
      {
        name: "Medium",
        handle: "@roha-pathan125",
        url: "https://medium.com/@roha-pathan125",
        icon: ExternalLink,
        color: "hover:bg-green-500/20",
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
