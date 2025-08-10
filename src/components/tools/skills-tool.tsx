"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Database, Cloud, Brain, Wrench, BookOpen } from "lucide-react"

const skillCategories = [
  {
    title: "Frontend Development",
    icon: Code,
    skills: ["Next.js", "React", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS"],
    color: "from-blue-500/20 to-cyan-500/20 border-blue-500/30",
  },
  {
    title: "Backend Development",
    icon: Database,
    skills: ["Python", "Django", "Flask", "Java", "C", "C++"],
    color: "from-green-500/20 to-emerald-500/20 border-green-500/30",
  },
  {
    title: "Databases & Data Management",
    icon: Database,
    skills: ["MySQL", "Oracle SQL", "PostgreSQL", "SQLite", "MongoDB", "Supabase"],
    color: "from-purple-500/20 to-violet-500/20 border-purple-500/30",
  },
  {
    title: "Version Control & Deployment",
    icon: Cloud,
    skills: ["Git", "GitHub", "Version Control", "Vercel"],
    color: "from-orange-500/20 to-red-500/20 border-orange-500/30",
  },
  {
    title: "AI & Machine Learning",
    icon: Brain,
    skills: ["Vertex AI", "RAG", "LLMs", "Agentic AI", "Machine Learning"],
    color: "from-pink-500/20 to-rose-500/20 border-pink-500/30",
  },
  {
    title: "Automation & Web Scraping",
    icon: Wrench,
    skills: ["Selenium", "Beautiful Soup"],
    color: "from-yellow-500/20 to-amber-500/20 border-yellow-500/30",
  },
  {
    title: "Software Engineering Concepts",
    icon: BookOpen,
    skills: [
      "OOP (Object-Oriented Programming)",
      "DSA (Data Structures & Algorithms)",
      "System Design",
      "Software Development",
      "Problem Solving",
    ],
    color: "from-teal-500/20 to-cyan-500/20 border-teal-500/30",
  },
]

export default function SkillsTool() {
  return (
    <Card className="w-full max-w-4xl ring-1 ring-white/15 bg-white/[0.06] backdrop-blur-md border-white/10">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-semibold text-white mb-2">Technical Skills</h3>
          <p className="text-white/70">Roha's comprehensive technology stack and expertise</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skillCategories.map((category) => {
            const Icon = category.icon
            return (
              <div
                key={category.title}
                className={`p-4 rounded-xl bg-gradient-to-br ${category.color} backdrop-blur-sm border`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-semibold text-white">{category.title}</h4>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="bg-white/10 text-white/90 border-white/20 hover:bg-white/20 transition-colors text-xs"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-white/60">
            Continuously learning and expanding expertise in emerging technologies
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
