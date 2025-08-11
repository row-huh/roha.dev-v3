"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, ExternalLink, Mail, Phone, MapPin, Globe, Github, Linkedin } from "lucide-react"
import Link from "next/link"

export default function ResumeTool() {
  return (
    <Card className="w-full max-w-4xl ring-1 ring-white/15 bg-white/[0.06] backdrop-blur-md border-white/10">
      <CardContent className="p-4">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-white mb-1">Roha Pathan</h1>
          <p className="text-base text-white/80 mb-2">FullStack & AI/ML Engineer</p>

          {/* Contact Info */}
          <div className="flex flex-wrap justify-center gap-3 text-xs text-white/70">
            <div className="flex items-center gap-1">
              <Mail className="w-3 h-3" />
              <Link href={'mailto:roha.pathan125@gmail.com'} className="transition-colors duration-200 hover:text-purple-400">
                <span>roha.pathan125@gmail.com</span>
              </Link>
            </div>
            <div className="flex items-center gap-1">
              <Phone className="w-3 h-3" />
              <span>+92 (325) 7007071</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>Karachi, PK</span>
            </div>
            <div className="flex items-center gap-1">
              <Globe className="w-3 h-3" />
              <Link href={'https://www.roha.dev'} className="transition-colors duration-200 hover:text-purple-400">
                <span>roha.dev</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Download Button */}
        <div className="text-center mb-4">
          <a href="/resume/resume.pdf" target="_blank" rel="noopener noreferrer">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white text-sm">
              <Download className="w-3 h-3 mr-1" />
              Download PDF
            </Button>
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-4">
            {/* Experience */}
            <section>
              <h2 className="text-lg font-semibold text-white mb-2 border-b border-white/20 pb-1">Experience</h2>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="text-base font-medium text-white">Freelance & University Projects</h3>
                      <p className="text-sm text-white/80">Self-directed & Academic</p>
                    </div>
                    <span className="text-xs text-white/60">2022 - Present</span>
                  </div>
                  <ul className="text-sm text-white/70 space-y-1 ml-4">
                    <li>• Built a high-performance historical search engine with PHP, MySQL & Node.js improving discovery speed by ~40%</li>
                    <li>• Developed a full-stack e-commerce site using Django</li>
                    <li>• Created multiple custom Discord bots with API integrations</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Projects */}
            <section>
              <h2 className="text-lg font-semibold text-white mb-2 border-b border-white/20 pb-1">Key Projects</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="text-base font-medium text-white">MalamaAI - AI Skin Disease Detection</h3>
                  <p className="text-sm text-white/70 mb-1">
                    Created a web app with Next.js & Flask using DinoV2 and Llama 3.3 70B for accurate skin disease analysis.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="secondary" className="text-xs bg-white/10 text-white/80">Next.js</Badge>
                    <Badge variant="secondary" className="text-xs bg-white/10 text-white/80">Flask</Badge>
                    <Badge variant="secondary" className="text-xs bg-white/10 text-white/80">AI/ML</Badge>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-medium text-white">Relic - Historical Search Engine</h3>
                  <p className="text-sm text-white/70 mb-1">
                    Engineered algorithms to uncover hidden links in archives using PHP, MySQL & Node.js.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="secondary" className="text-xs bg-white/10 text-white/80">PHP</Badge>
                    <Badge variant="secondary" className="text-xs bg-white/10 text-white/80">MySQL</Badge>
                    <Badge variant="secondary" className="text-xs bg-white/10 text-white/80">Node.js</Badge>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-medium text-white">Gold Fish - Expense Tracker</h3>
                  <p className="text-sm text-white/70 mb-1">
                    Built with Streamlit & Python to simplify budget management and long-term tracking.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="secondary" className="text-xs bg-white/10 text-white/80">Streamlit</Badge>
                    <Badge variant="secondary" className="text-xs bg-white/10 text-white/80">Python</Badge>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Education */}
            <section>
              <h2 className="text-lg font-semibold text-white mb-2 border-b border-white/20 pb-1">Education</h2>
              <div>
                <h3 className="text-base font-medium text-white">Bachelor of Software Engineering</h3>
                <p className="text-sm text-white/80">UIT University</p>
                <p className="text-sm text-white/70">Expected May 2026 | Currently 7th Semester</p>
                <span className="text-xs text-white/60">CGPA: 3.16</span>
              </div>
            </section>

            {/* Skills */}
            <section>
              <h2 className="text-lg font-semibold text-white mb-2 border-b border-white/20 pb-1">Technical Skills</h2>
              <div className="space-y-2">
                <div>
                  <h4 className="text-sm font-medium text-white/90 mb-1">Languages</h4>
                  <div className="flex flex-wrap gap-1">
                    {["Python","Java","C","JavaScript","TypeScript","PHP","SQL"].map(skill => (
                      <Badge key={skill} variant="secondary" className="text-xs bg-white/10 text-white/80">{skill}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-white/90 mb-1">Frameworks & Tools</h4>
                  <div className="flex flex-wrap gap-1">
                    {["Next.js","React","Django","Flask","Supabase","PostgreSQL","MySQL","BeautifulSoup","Selenium"].map(skill => (
                      <Badge key={skill} variant="secondary" className="text-xs bg-white/10 text-white/80">{skill}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-white/90 mb-1">AI/ML</h4>
                  <div className="flex flex-wrap gap-1">
                    {["LLMs","ML/AI","Vertex AI"].map(skill => (
                      <Badge key={skill} variant="secondary" className="text-xs bg-white/10 text-white/80">{skill}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Certifications */}
            <section>
              <h2 className="text-lg font-semibold text-white mb-2 border-b border-white/20 pb-1">Certifications</h2>
              <div className="space-y-2">
                <div>
                  <h3 className="text-sm font-medium text-white">CS50P - Python Programming</h3>
                  <p className="text-xs text-white/70">Harvard University</p>
                  <a href="https://cs50.harvard.edu/certificates/aeb756b8-e607-46ab-b95b-d835bd352cbd" className="text-xs text-purple-400 hover:text-gray-400">View Certificate</a>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white">CS50AI - Artificial Intelligence</h3>
                  <p className="text-xs text-white/70">Harvard University</p>
                  <a href="https://cs50.harvard.edu/certificates/e46f231e-3be6-4b4e-8bd8-c58f82e7bf2d" className="text-xs text-purple-400 hover:text-gray-400">View Certificate</a>
                </div>
              </div>
            </section>

            {/* Links */}
            <section>
              <h2 className="text-lg font-semibold text-white mb-2 border-b border-white/20 pb-1">Links</h2>
              <div className="space-y-2">
                <a href="https://github.com/row-huh" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
                  <Github className="w-3 h-3" /><span>GitHub</span><ExternalLink className="w-3 h-3" />
                </a>
                <a href="https://www.linkedin.com/in/roha-pathan-687960272/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
                  <Linkedin className="w-3 h-3" /><span>LinkedIn</span><ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </section>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
