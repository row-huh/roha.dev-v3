"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Code, Laptop, Trophy, Award } from "lucide-react" // Ensure all used icons are imported

// Map icon names to their actual components
const iconMap = {
  Award: Award,
  Code: Code,
  Laptop: Laptop,
  Trophy: Trophy,
}

interface TimelineEvent {
  id: string
  title: string
  description: string
  iconName: keyof typeof iconMap // Now expects a string name
  viewProjectLink?: string
  viewCertificateLink?: string // Optional link for hackathon certificates/awards
}

export default function Timeline() {
  const timelineEvents: TimelineEvent[] = [
    {
      id: "hackathon-1",
      title: "Lokahi Innovation in Healthcare Hackathon",
      description:
        "Developed a real-time AI chatbot using a custom RAG pipeline, integrating with a web interface for interactive conversations.",
      iconName: "Code", // Use the string name
      viewProjectLink: "https://lablab.ai/event/lokahi-innovation-in-healthcare/codeducklings/malamaai",
      viewCertificateLink: "https://lablab.ai/u/@roha_pathan282/cm7jn1qik002t14ipj50t63yc",
    },
    {
      id: "hackathon-2",
      title: "Build with Low-Code: Langflow Hack",
      description:
        "Contributed to a blockchain-based decentralized identity solution, focusing on secure authentication and data privacy.",
      iconName: "Laptop", // Use the string name
      viewProjectLink: "https://lablab.ai/event/langflow-hackathon/rohabecoding/accessible-ui", // Placeholder
    },
    {
      id: "hackathon-3",
      title: "Bahria University Techathon",
      description:
        "Applied deep learning techniques to assist in the analysis of medical images, improving diagnostic support accuracy.",
      iconName: "Code", // Use the string name
      viewProjectLink: "https://github.com/row-huh/Tecna-s-Tribe_Techathon", // Placeholder
      viewCertificateLink: "https://www.instagram.com/p/DDzDzqfu2_-/?utm_source=ig_web_copy_link&igsh=ZnJndmZ2anM2cG41",
    },
    {
      id: "hackathon-4",
      title: "Vertex AI Agent Builer",
      description:
        "Explored integrating blockchain mechanics into a casual web game, focusing on in-game asset ownership.",
      iconName: "Trophy", // Use the string name
      viewProjectLink: "https://github.com/Laiba-lax/AfterSchool", // Placeholder
      viewCertificateLink: "https://devpost.com/software/skinai-ufobl8",
    },
    {
      id: "hackathon-5",
      title: "Assistants API and TruLens Hackathon",
      description:
        "Built a prototype for an energy consumption monitoring app using IoT data and predictive analytics.",
      iconName: "Laptop", // Use the string name
      viewProjectLink: "https://lablab.ai/event/assistants-api-llamaindex-mongodb-battle/ampufitness/ampufitness", // Placeholder
      viewCertificateLink: "https://lablab.ai/u/@roha_pathan282/clwrzm2dz0006gdq2j4t4qwf8", // Placeholder
    },
  ]

  return (
    <section className="py-56 px-8 relative z-10">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-medium text-purple-400 mb-6">I Began to Join Hackathons...</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {"During my time in university, I joined a bunch of hackathons because of the "}
            <span className="line-through">prize money</span>
            {" skills I could gain out of them. They were honestly a load of fun"}
          </p>
        </motion.div>

        <div className="relative flex flex-col items-center">
          {/* Vertical Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-700 rounded-full z-0" />

          {timelineEvents.map((event, index) => {
            const IconComponent = iconMap[event.iconName] // Get the component from the map
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative w-full flex items-center py-8 ${
                  index % 2 === 0
                    ? "justify-start pr-8 md:pr-0 md:justify-end"
                    : "justify-end pl-8 md:pl-0 md:justify-start"
                }`}
              >
                {/* Timeline Node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center border-2 border-gray-900 shadow-lg">
                    <IconComponent className="h-4 w-4 text-white" /> {/* Render the component */}
                  </div>
                </div>

                {/* Event Card */}
                <Card
                  className={`bg-gray-800/30 border-gray-700/50 backdrop-blur-sm p-6 rounded-3xl w-full md:w-5/12 transition-all duration-300 hover:bg-gray-800/40 ${
                    index % 2 === 0 ? "md:mr-[calc(50%+20px)] text-right" : "md:ml-[calc(50%+20px)] text-left"
                  }`}
                >
                  <h3 className="text-xl font-semibold text-white mb-3">{event.title}</h3>
                  <p className="text-base text-gray-300 leading-relaxed mb-4">{event.description}</p>
                  <div className="flex gap-3 mt-4">
                    {event.viewProjectLink && (
                      <Link href={event.viewProjectLink} target="_blank" rel="noopener noreferrer">
                        <Button
                          variant="outline"
                          className="rounded-full border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent px-4 py-2 text-sm"
                        >
                          <ExternalLink className="h-3 w-3 mr-2" /> View Project
                        </Button>
                      </Link>
                    )}
                    {event.viewCertificateLink && (
                      <Link href={event.viewCertificateLink} target="_blank" rel="noopener noreferrer">
                        <Button
                          variant="outline"
                          className="rounded-full border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent px-4 py-2 text-sm"
                        >
                          <ExternalLink className="h-3 w-3 mr-2" /> View Certificate
                        </Button>
                      </Link>
                    )}
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
