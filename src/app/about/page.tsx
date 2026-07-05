import Link from "next/link"
import NavBar from "@/components/nav-bar"
import Footer from "@/components/footer"
import ThemeToggle from "@/components/theme-toggle"

const notes = [
  {
    title: "How it started",
    body: "I first got hooked on programming through CS50, C, Python, and AI. It gave me the first real sense that code could turn curiosity into something usable.",
  },
  {
    title: "University",
    body: "I am studying Software Engineering, keeping a steady pace through the degree while building projects outside class and learning by making things.",
  },
  {
    title: "Hackathons",
    body: "I joined a bunch of hackathons across AI, healthcare, low-code tools, identity, and product prototypes. They were useful pressure cookers for shipping quickly.",
  },
  {
    title: "Freelance work",
    body: "I have worked on small client projects, websites, curriculum development, and programming tutoring.",
  },
  {
    title: "Current focus",
    body: "Right now I am leaning deeper into AI engineering and deep learning, including transformer architectures and building an LLM from scratch.",
  },
]

const links = [
  {
    label: "CS50P certificate",
    href: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Djw3OP1LQTb8cKUF8p9N8yUGW44mMg.png",
  },
  {
    label: "CS50AI certificate",
    href: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-7jpxTxs6g9LbJyNBaI2TbQIbjJgMzL.png",
  },
  {
    label: "GitHub",
    href: "https://github.com/row-huh",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/roha-pathan",
  },
  {
    label: "Resume",
    href: "/resume/resume.pdf",
  },
]

const projectLinks = [
  {
    label: "MalamaAI hackathon project",
    href: "https://lablab.ai/event/lokahi-innovation-in-healthcare/codeducklings/malamaai",
  },
  {
    label: "Accessible UI hackathon project",
    href: "https://lablab.ai/event/langflow-hackathon/rohabecoding/accessible-ui",
  },
  {
    label: "Techathon repository",
    href: "https://github.com/row-huh/Tecna-s-Tribe_Techathon",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="bg-page-grid fixed inset-0 pointer-events-none" />
      <ThemeToggle />
      <NavBar />

      <main className="relative z-10 px-5 pt-32 pb-20 sm:px-8">
        <article className="mx-auto max-w-3xl">
          <header className="border-b border-gray-700/50 pb-10">
            <p className="mb-4 text-xs font-display uppercase tracking-[0.22em] text-moss-400">About me</p>
            <h1 className="text-3xl font-medium leading-tight text-white sm:text-5xl">Roha Pathan</h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-gray-300 sm:text-lg">
              I am a software engineering student and fullstack developer moving deeper into AI engineering. I like
              building practical things, writing when I have a thought I cannot shake, and learning the machinery behind
              intelligent systems.
            </p>
          </header>

          <section className="py-10">
            <h2 className="text-sm font-medium uppercase tracking-[0.18em] text-gray-400">The short version</h2>
            <div className="mt-6 space-y-8">
              {notes.map((note) => (
                <section key={note.title} className="grid gap-2 border-b border-gray-800/80 pb-6 sm:grid-cols-[160px_1fr]">
                  <h3 className="text-sm font-medium text-moss-400">{note.title}</h3>
                  <p className="text-sm leading-7 text-gray-300">{note.body}</p>
                </section>
              ))}
            </div>
          </section>

          <section className="grid gap-10 border-t border-gray-700/50 pt-10 md:grid-cols-2">
            <div>
              <h2 className="text-sm font-medium uppercase tracking-[0.18em] text-gray-400">Links</h2>
              <div className="mt-5 flex flex-col items-start gap-3">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-sm text-gray-300 underline underline-offset-4 transition-colors hover:text-moss-400"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-sm font-medium uppercase tracking-[0.18em] text-gray-400">Selected receipts</h2>
              <div className="mt-5 flex flex-col items-start gap-3">
                {projectLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-300 underline underline-offset-4 transition-colors hover:text-moss-400"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  )
}
