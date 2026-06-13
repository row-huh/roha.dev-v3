"use client"

import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react"

export default function ContactApp() {
  const inputCls =
    "w-full rounded-none border-2 border-[#2f2616] bg-[#f3eedd] px-3 py-2 text-[13px] text-[#3b2f1e] placeholder-[#a89a78] outline-none focus:bg-[#fbf7ec]"

  return (
    <div className="os-pixel p-6 text-[#3b2f1e]">
      <h2 className="text-base font-semibold text-[#5c7a38]">Get in touch</h2>
      <p className="mt-1 text-[13px] text-[#6b5b43]">
        Have a project, a question about AI, or just want to say hello?
      </p>

      <div className="mt-5 space-y-3 text-[13px]">
        <a
          href="mailto:roha.pathan125@gmail.com"
          className="flex items-center gap-3 text-[#5a4a32] hover:text-[#a8552e]"
        >
          <Mail className="h-4 w-4 text-[#a8552e]" strokeWidth={2} /> roha.pathan125@gmail.com
        </a>
        <div className="flex items-center gap-3 text-[#5a4a32]">
          <Phone className="h-4 w-4 text-[#a8552e]" strokeWidth={2} /> +92 325 7007071
        </div>
        <div className="flex items-center gap-3 text-[#5a4a32]">
          <MapPin className="h-4 w-4 text-[#a8552e]" strokeWidth={2} /> Karachi, Pakistan
        </div>
        <div className="flex items-center gap-2 pt-1">
          <a
            href="https://github.com/row-huh"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 w-8 items-center justify-center rounded-none border-2 border-[#2f2616] bg-[#f3eedd] text-[#3b2f1e] hover:bg-[#e6dcc2]"
          >
            <Github className="h-4 w-4" strokeWidth={2} />
          </a>
          <a
            href="https://www.linkedin.com/in/roha-pathan-687960272/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 w-8 items-center justify-center rounded-none border-2 border-[#2f2616] bg-[#f3eedd] text-[#3b2f1e] hover:bg-[#e6dcc2]"
          >
            <Linkedin className="h-4 w-4" strokeWidth={2} />
          </a>
        </div>
      </div>

      <form method="POST" action="https://formspree.io/f/mdkdydnj" className="mt-6 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <input name="name" type="text" placeholder="Your name" className={inputCls} />
          <input name="email" type="email" placeholder="Your email" className={inputCls} />
        </div>
        <input name="subject" type="text" placeholder="Subject" className={inputCls} />
        <textarea
          name="message"
          rows={4}
          placeholder="Deploy your thoughts here…"
          className={`${inputCls} resize-none`}
        />
        <button
          type="submit"
          className="os-shadow-sm w-full rounded-none border-2 border-[#2f2616] bg-[#8fa15e] py-2.5 text-[13px] font-semibold text-[#2f2616] transition-colors hover:bg-[#9fb06a]"
        >
          Send Message
        </button>
      </form>
    </div>
  )
}
