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
              <span>roha.pathan125@gmail.com</span>
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
              <span>roha.dev</span>
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
                      <h3 className="text-base font-medium text-white">Senior Software Engineer</h3>
                      <p className="text-sm text-white/80">TechCorp Inc.</p>
                    </div>
                    <span className="text-xs text-white/60">2022 - Present</span>
                  </div>
                  <ul className="text-sm text-white/70 space-y-1 ml-4">
                    <li>• Led development of AI-powered features using Python and TensorFlow</li>
                    <li>• Built scalable web applications with Next.js and React</li>
                    <li>• Improved system performance by 40% through optimization</li>
                  </ul>
                </div>

                <div>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="text-base font-medium text-white">Software Engineer</h3>
                      <p className="text-sm text-white/80">StartupXYZ</p>
                    </div>
                    <span className="text-xs text-white/60">2020 - 2022</span>
                  </div>
                  <ul className="text-sm text-white/70 space-y-1 ml-4">
                    <li>• Developed full-stack applications using Django and React</li>
                    <li>• Implemented machine learning models for data analysis</li>
                    <li>• Collaborated with cross-functional teams on product features</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Projects */}
            <section>
              <h2 className="text-lg font-semibold text-white mb-2 border-b border-white/20 pb-1">Key Projects</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="text-base font-medium text-white">MalamaAI - AI-Powered Healthcare Platform</h3>
                  <p className="text-sm text-white/70 mb-1">
                    Built an AI platform for healthcare diagnostics using machine learning and computer vision.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="secondary" className="text-xs bg-white/10 text-white/80">
                      Python
                    </Badge>
                    <Badge variant="secondary" className="text-xs bg-white/10 text-white/80">
                      TensorFlow
                    </Badge>
                    <Badge variant="secondary" className="text-xs bg-white/10 text-white/80">
                      React
                    </Badge>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-medium text-white">Neutral - Social Media Analytics</h3>
                  <p className="text-sm text-white/70 mb-1">
                    Developed a platform for analyzing social media sentiment using NLP and data visualization.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="secondary" className="text-xs bg-white/10 text-white/80">
                      Next.js
                    </Badge>
                    <Badge variant="secondary" className="text-xs bg-white/10 text-white/80">
                      Python
                    </Badge>
                    <Badge variant="secondary" className="text-xs bg-white/10 text-white/80">
                      MongoDB
                    </Badge>
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
                <h3 className="text-base font-medium text-white">Bachelor of Science</h3>
                <p className="text-sm text-white/80">Software Engineering</p>
                <p className="text-sm text-white/70">University Institute of Technology</p>
                <span className="text-xs text-white/60">2022 - 2026</span>
              </div>
            </section>

            {/* Skills */}
            <section>
              <h2 className="text-lg font-semibold text-white mb-2 border-b border-white/20 pb-1">Technical Skills</h2>
              <div className="space-y-2">
                <div>
                  <h4 className="text-sm font-medium text-white/90 mb-1">Languages</h4>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="secondary" className="text-xs bg-white/10 text-white/80">
                      Python
                    </Badge>
                    <Badge variant="secondary" className="text-xs bg-white/10 text-white/80">
                      JavaScript
                    </Badge>
                    <Badge variant="secondary" className="text-xs bg-white/10 text-white/80">
                      TypeScript
                    </Badge>
                    <Badge variant="secondary" className="text-xs bg-white/10 text-white/80">
                      Java
                    </Badge>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-white/90 mb-1">Frameworks</h4>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="secondary" className="text-xs bg-white/10 text-white/80">
                      React
                    </Badge>
                    <Badge variant="secondary" className="text-xs bg-white/10 text-white/80">
                      Next.js
                    </Badge>
                    <Badge variant="secondary" className="text-xs bg-white/10 text-white/80">
                      Django
                    </Badge>
                    <Badge variant="secondary" className="text-xs bg-white/10 text-white/80">
                      Flask
                    </Badge>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-white/90 mb-1">AI/ML</h4>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="secondary" className="text-xs bg-white/10 text-white/80">
                      TensorFlow
                    </Badge>
                    <Badge variant="secondary" className="text-xs bg-white/10 text-white/80">
                      PyTorch
                    </Badge>
                    <Badge variant="secondary" className="text-xs bg-white/10 text-white/80">
                      Scikit-learn
                    </Badge>
                  </div>
                </div>
              </div>
            </section>

            {/* Certifications */}
            <section>
              <h2 className="text-lg font-semibold text-white mb-2 border-b border-white/20 pb-1">Certifications</h2>
              <div className="space-y-2">

              <Link href={'https://cs50.harvard.edu/certificates/aeb756b8-e607-46ab-b95b-d835bd352cbd'}>
                <div>
                  <h3 className="text-sm font-medium text-white">CS50P - Python Programming</h3>
                  <p className="text-xs text-white/70">Harvard University</p>
                </div>
              </Link>


              <Link href={'https://cs50.harvard.edu/certificates/e46f231e-3be6-4b4e-8bd8-c58f82e7bf2d'}>
                <div>
                  <h3 className="text-sm font-medium text-white">CS50AI - Artificial Intelligence</h3>
                  <p className="text-xs text-white/70">Harvard University</p>
                </div>
              </Link>

              </div>
            </section>

            {/* Links */}
            <section>
              <h2 className="text-lg font-semibold text-white mb-2 border-b border-white/20 pb-1">Links</h2>
              <div className="space-y-2">
                <a
                  href="https://github.com/row-huh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
                >
                  <Github className="w-3 h-3" />
                  <span>GitHub</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href="https://www.linkedin.com/in/roha-pathan-687960272/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
                >
                  <Linkedin className="w-3 h-3" />
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </section>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
