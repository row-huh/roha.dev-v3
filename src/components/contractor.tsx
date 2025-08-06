import { motion } from "framer-motion"

export default function ContractorArc() {
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
            <h2 className="text-4xl font-medium text-purple-400 mb-6">Then came my freelancer arc...</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              I undertook small projects for various clients, including website development, curriculum development, and
              tutoring individuals in programming topics.
            </p>
          </motion.div>
        </div>
      </section>
    )
}