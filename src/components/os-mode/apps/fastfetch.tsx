"use client"

// Cottagecore "fastfetch": a pixel-farmer ASCII (from village-hero.png) on the
// left, bio on the right. Warm parchment + forest-green palette.

const ASCII = `                  -=++*=
                -=+===*=
         ---::=+*++==+#
       :++****+++=+++*+
        :+*#**#*+*+=+**-
          =%+=:+:+*+++*+=: -
          -+#=:==++*%#*++*++:
 -:--     -:==-:+::*+:+**++=*:
 :*++:    :+++=+=-..=::*+****:
-:+==::==-++*+++**=:+:-+****=
:===+=+*+  **++**+*+=+=:---
-=**++*#*  -*%++***+%#**=
 -=*****= -+#%#*##+=++++=+:
    ----  :#*#+###%*=**+===:-
               +**=  =*++++:
                     -+****#:
                      :+***+-`

const lately = [
  "Diving deep into LLMs, automation agents, deep learning, and vision",
  "Experimenting with random builds and side projects",
  "Reading Hitchhiker's guide to the galaxy",
  "Occasionally writing blogs and keeping up with AI news (which is pretty much a full-time job at this point)",
]

export default function FastFetch() {
  return (
    <div className="os-pixel h-full bg-[#ece6d6] px-5 py-4 text-[13px] leading-relaxed text-[#3b2f1e]">
      {/* prompt line */}
      <div className="mb-3 text-[#6b5b43]">
        <span className="text-[#5c7a38]">roha</span>
        <span className="text-[#8b7a55]">@</span>
        <span className="text-[#a8552e]">village</span>
        <span className="text-[#8b7a55]">:~$ </span>
        <span className="text-[#3b2f1e]">fastfetch</span>
      </div>

      <div className="flex flex-col gap-5 sm:flex-row sm:gap-7">
        {/* ASCII farmer */}
        <pre className="shrink-0 select-none whitespace-pre bg-gradient-to-br from-[#5c7a38] via-[#8fa15e] to-[#a8552e] bg-clip-text text-[8px] leading-[1.05] text-transparent">
          {ASCII}
        </pre>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <div className="text-sm">
            <span className="font-semibold text-[#5c7a38]">roha</span>
            <span className="text-[#8b7a55]">@</span>
            <span className="font-semibold text-[#a8552e]">village</span>
          </div>
          <div className="my-1 text-[#a89a78]">────────────────────</div>

          <p className="text-[#a8552e]">Heyo, I&apos;m Roha</p>
          <p className="mt-2 text-[#5a4a32]">
            I&apos;m a software engineer who writes sometimes, watches too much anime, is into
            physics, science fiction, and books. I like solving problems, going for long walks,
            sleeping, talking about tech, distro hopping and sleeping (yes)
          </p>

          <p className="mt-4 text-[#5c7a38]">Lately, I&apos;ve been</p>
          <ul className="mt-1 space-y-1">
            {lately.map((line) => (
              <li key={line} className="flex gap-2 text-[#5a4a32]">
                <span className="select-none text-[#8fa15e]">✿</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>

          {/* color palette strip */}
          <div className="mt-5 flex gap-1">
            {["#3b2f1e", "#a8552e", "#c2703d", "#c9a86a", "#8fa15e", "#5c7a38", "#6b8b3f", "#ece6d6"].map(
              (c, i) => (
                <span
                  key={i}
                  className="h-4 w-4 rounded-none border-2 border-[#2f2616]"
                  style={{ backgroundColor: c }}
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
