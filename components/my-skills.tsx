"use client"
import { motion } from "framer-motion"
import {
  Code,
  Atom,
  Type,
  Coffee,
  GitBranch,
  Github,
  Database,
  Brain,
  MessageSquare,
  Bot,
  Layout,
  Palette,
  Cloud,
  Laptop,
  Lightbulb,
} from "lucide-react"
import type React from "react" // Import React for React.ElementType

interface Skill {
  name: string
  icon: React.ElementType
}

interface SkillRowProps {
  skills: Skill[]
  direction: "left" | "right"
  speed: number // Speed of the animation
}

function SkillRow({ skills, direction, speed }: SkillRowProps) {
  const animationVariants = {
    animate: {
      x: direction === "left" ? ["0%", "-100%"] : ["-100%", "0%"],
      transition: {
        x: {
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          duration: speed,
          ease: "linear",
        },
      },
    },
  }

  // Duplicate skills to ensure seamless looping
  const duplicatedSkills = [...skills, ...skills, ...skills, ...skills, ...skills] // More duplication for longer seamless scroll

  return (
    <div className="relative w-full overflow-hidden py-2">
      {" "}
      {/* Reduced vertical padding */}
      <motion.div className="flex whitespace-nowrap" variants={animationVariants} animate="animate">
        {duplicatedSkills.map((skill, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1 }} // Subtle scale on hover
            transition={{ duration: 0.2 }}
            className="flex-none mx-6 flex items-center justify-center text-center" // Changed to flex items-center
          >
            <skill.icon className="h-5 w-5 text-gray-300 mr-2" /> {/* Icon to the left, smaller size */}
            <p className="text-sm font-medium text-gray-300">{skill.name}</p> {/* Text size adjusted */}
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default function MySkills() {
  const allSkills: Skill[] = [
    { name: "Next.js", icon: Code },
    { name: "React", icon: Atom },
    { name: "TypeScript", icon: Type },
    { name: "JavaScript", icon: Code },
    { name: "Python", icon: Code },
    { name: "Flask", icon: Code },
    { name: "Django", icon: Code },
    { name: "HTML", icon: Code },
    { name: "CSS", icon: Code },
    { name: "Tailwind CSS", icon: Palette },
    { name: "Java", icon: Coffee },
    { name: "C", icon: Code },
    { name: "C++", icon: Code },
    { name: "Git", icon: GitBranch },
    { name: "GitHub", icon: Github },
    { name: "Version Control", icon: GitBranch },
    { name: "Selenium", icon: Bot },
    { name: "Beautiful Soup", icon: Code },
    { name: "MySQL", icon: Database },
    { name: "Oracle SQL", icon: Database },
    { name: "Supabase", icon: Database },
    { name: "PostgreSQL", icon: Database },
    { name: "SQLite", icon: Database },
    { name: "MongoDB", icon: Database },
    { name: "RAG", icon: Brain },
    { name: "LLM", icon: MessageSquare },
    { name: "Agentic AI", icon: Bot },
    { name: "System Design", icon: Layout },
    { name: "Vercel", icon: Cloud },
    { name: "Software Development", icon: Laptop },
    { name: "Problem Solving", icon: Lightbulb },
  ]

  // Split skills into three rows
  const row1Skills = allSkills.slice(0, 11)
  const row2Skills = allSkills.slice(11, 22)
  const row3Skills = allSkills.slice(22, 33) // Remaining skills

  return (
    <section className="py-56 px-8 relative z-10">
      <div className="max-w-6xl mx-auto text-center px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-medium text-purple-400 mb-4 leading-tight">My Skills</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise and tools.
          </p>
        </motion.div>

        <div className="flex flex-col gap-4">
          {" "}
          {/* Reduced gap between rows */}
          <SkillRow skills={row1Skills} direction="left" speed={60} />
          <SkillRow skills={row2Skills} direction="right" speed={70} />
          <SkillRow skills={row3Skills} direction="left" speed={65} />
        </div>
      </div>
    </section>
  )
}
