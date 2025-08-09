"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { GraduationCap, Code, Laptop } from "lucide-react"

export default function UniversityJourney() {
  return (
    <section className="py-24 px-8 relative z-10">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-medium text-purple-400 mb-3">Then I joined University...</h2>
          <p className="text-base text-gray-400 max-w-2xl mx-auto mb-2">
            I did think about skipping university and becoming mark zuckerberg but i'm almost glad i didn't (almost)
          </p>

        </motion.div>

        {/* University Projects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <Card className="bg-gray-800/30 border-gray-700/50 backdrop-blur-sm p-8 rounded-3xl flex flex-col items-center justify-center text-center h-48">
            <GraduationCap className="h-12 w-12 text-blue-400 mb-0" />
            <h3 className="text-lg font-semibold text-white">Software Engineering Major</h3>
            <p className="text-sm text-gray-400 mt-2">Building the future with code</p>
          </Card>

          <Card className="bg-gray-800/30 border-gray-700/50 backdrop-blur-sm p-8 rounded-3xl flex flex-col items-center justify-center text-center h-48">
            <Code className="h-8 w-8 text-purple-400 mb-0" />
            <h3 className="text-lg font-semibold text-white">7th Semester</h3>
            <p className="text-sm text-gray-400 mt-2">Almost at the finish line</p>
          </Card>

          <Card className="bg-gray-800/30 border-gray-700/50 backdrop-blur-sm p-8 rounded-3xl flex flex-col items-center justify-center text-center h-48">
            <Laptop className="h-12 w-12 text-purple-400 mb-0" />
            <h3 className="text-lg font-semibold text-white">3.16 CGPA</h3>
            <p className="text-sm text-gray-400 mt-2">Keeping steady progress</p>
          </Card>
        </motion.div>

      </div>
    </section>
  )
}
