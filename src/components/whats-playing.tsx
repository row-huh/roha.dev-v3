import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"


export default function WhatsPlaying() {
    return (
    <section className="py-56 px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-pixel text-4xl font-medium text-[var(--v-ink)] mb-6">🎵 Currently Playing</h2>
            <p className="text-lg text-[var(--v-ink-soft)] mb-12">
              Music that's recently on repeat, I'll keep updating this
            </p>

            <Card className="bg-[var(--v-panel)]/70 border-[var(--v-border)]/70 backdrop-blur-sm p-2 rounded-2xl max-w-2xl mx-auto shadow-[0_12px_30px_-12px_rgba(110,83,60,0.4)]">
              <iframe
                style={{ borderRadius: "12px" }}
                src="https://open.spotify.com/embed/track/0H7Wdgn1C7vFy4z0o2kBUZ?utm_source=generator&theme=0"
                width="100%"
                height="352"
                frameBorder="0"
                allowFullScreen={true}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                title="Spotify Embed"
              ></iframe>
            </Card>
          </motion.div>
        </div>
      </section>
    )
}