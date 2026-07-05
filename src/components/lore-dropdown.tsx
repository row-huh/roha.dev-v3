"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Cs50Certificates from "@/components/cs50-certificates"
import UniversityJourney from "@/components/university-journey"
import Timeline from "@/components/timeline"
import ContractorArc from "@/components/contractor"
import DeepLearningJourney from "@/components/deep-learning-journey"

export default function LoreDropdown() {
  const [open, setOpen] = useState(false)

  return (
    <section className="px-8 py-20 relative z-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="group inline-flex items-center gap-3 rounded-full border border-moss-500/30 bg-moss-500/10 px-6 py-3 text-sm font-display uppercase tracking-[0.18em] text-moss-300 backdrop-blur-sm transition-colors hover:bg-moss-500/20 hover:border-moss-500/50"
          >
            <span aria-hidden>📜</span>
            {open ? "Close the lore" : "Read the lore"}
            <motion.span
              aria-hidden
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="text-moss-400"
            >
              ▾
            </motion.span>
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="lore-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="bg-lore overflow-hidden"
          >
            <div className="pt-24">
              {/* How it Began */}
              <Cs50Certificates />

              {/* Then I Joined University */}
              <UniversityJourney />

              {/* Hackathons */}
              <Timeline />

              {/* Freelancer Arc */}
              <ContractorArc />

              {/* What I'm Up To Now */}
              <DeepLearningJourney />

              {/* Close the lore from the bottom */}
              <div className="flex justify-center pt-16 pb-4">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="group inline-flex items-center gap-3 rounded-full border border-moss-500/30 bg-moss-500/10 px-6 py-3 text-sm font-display uppercase tracking-[0.18em] text-moss-300 backdrop-blur-sm transition-colors hover:bg-moss-500/20 hover:border-moss-500/50"
                >
                  <span aria-hidden>📜</span>
                  Close the lore
                  <span aria-hidden className="text-moss-400">
                    ▴
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
