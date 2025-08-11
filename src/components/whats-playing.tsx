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
            <h2 className="text-4xl font-medium text-white mb-6">Currently Playing</h2>
            <p className="text-lg text-gray-400 mb-12">
              Music that's recently on repeat, I'll keep updating this
            </p>

            <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20 backdrop-blur-sm p-2 rounded-2xl max-w-2xl mx-auto">
              <iframe
                style={{ borderRadius: "12px" }}
                src="https://open.spotify.com/embed/track/1PxWdVaPyl0nekE1C5sylV?utm_source=generator"
                width="100%"
                height="352"
                frameBorder="0"
                allowFullScreen={true}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="Spotify Embed"
              ></iframe>
            </Card>
          </motion.div>
        </div>
      </section>
    )
}