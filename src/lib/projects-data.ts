export interface Project {
  slug: string
  title: string
  description: string
  image: string
  tags: string[]
  githubLink?: string
  liveDemoLink?: string
  youtubeLink?: string
  writeupLink?: string
  type: "featured" | "hackathon" | "passion" | "archive"
  isCurrentlyWorking?: boolean
}

export const projects: Project[] = [
  {
    slug: "llm-from-scratch",
    title: "LLM from Scratch: Unveiling the Transformer",
    description:
      "Building a large language model from the ground up, exploring transformer architectures and attention mechanisms. This project is a deep dive into the foundational architecture of LLMs.",
    image: "/projects/highlight/llm-from-scratch.png",
    tags: ["AI", "Deep Learning", "Transformers", "Python", "PyTorch"],
    githubLink: "https://github.com/row-huh/llm-from-scratch",
    liveDemoLink: "#",
    type: "featured",
    isCurrentlyWorking: true,
  },
  {
    slug: "time-venturers",
    title: "Time Venturers - Text Based RPG",
    description: "Time Venturers is a text-based role-playing game set in the future. You've been pulled into the year 2094 — but you don't know who did it or why. Your mission? Figure it out as you explore this strange new world!",
    image: "/projects/projects/time-venturers.png",
    tags: ["Python"],
    githubLink: "https://github.com/row-huh/time-ventures",
    youtubeLink: "https://www.youtube.com/watch?v=2ck6IDWG4Kc",
    type: "passion"
  },
  {
    slug: "neutral",
    title: "Neutral - Detecting subconscious biases",
    description: "Flags possible bias in hiring decisions: Gemini parses the resume into features, a logistic regression model trained on a Kaggle hiring dataset scores the decision, and LIME shows the reasoning.",
    image: "/projects/projects/neutral.png",
    tags: ["Gemini", "Logistic Regression", "LIME", "Streamlit"],
    githubLink: "https://github.com/TechEvents-BUDS/Tecna-s-Tribe_Techathon/",
    liveDemoLink: "#",
    writeupLink: "/writing/recruitment-bias",
    type: "hackathon",
  },
  {
    slug: "pethia",
    title: "Pethia",
    description: "Sassiest discord bot known to man",
    image: "/projects/projects/pethia.png",
    tags: ["Python", "Discord.py", "External APIs"],
    githubLink: "#",
    liveDemoLink: "#",
    type: "passion",
  },
  {
    slug: "bool",
    title: "Bool",
    description: "One of the first things I ever coded. Bool is just a simple rule based bot bud",
    image: "/projects/projects/bool.png",
    tags: ["Python"],
    githubLink: "#",
    liveDemoLink: "#",
    type: "passion",
  },
  {
    slug: "relic",
    title: "Relic",
    description: "Search through an entire historical archive of data to correlate events from the past to history",
    image: "/projects/projects/relic.png",
    tags: ["PHP", "MySQL", "Node.js"],
    githubLink: "",
    liveDemoLink: "#",
    type: "hackathon",
  },
  {
    slug: "goldfish-expense-tracker",
    title: "Gold Fish",
    description: "Tool to track, manage, and store expenses",
    image: "/projects/projects/goldfish.png",
    tags: ["Streamlit", "Python"],
    githubLink: "https://github.com/row-huh/Expense-Tracker",
    liveDemoLink: "#",
    type: "hackathon",
  },
  {
    slug: "portfolio-v3",
    title: "Portfolio v3",
    description:
      "The third iteration of my personal portfolio, focusing on modern UI/UX and storytelling",
    image: "/projects/projects/portfoliov3.png",
    tags: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    githubLink: "https://github.com/row-huh/roha-portfolio",
    liveDemoLink: "/",
    type: "passion",
  },
  {
    slug: "malama-ai",
    title: "MalamaAI- Skin Disease Detection",
    description: "MalamaAI detects skin diseases using ml model based off of dinov2 deployed on a webapp built with Next.js and Flask, with Llama 3.3 70B on top for the analysis.",
    image: "/projects/projects/malama.png",
    tags: ["ML", "Next.js", "Flask", "Llama", "DinoV2"],
    githubLink: "https://github.com/row-huh/MalamaAI",
    liveDemoLink: "#",
    type: "hackathon",
  },
  {
    slug: "accessible-ui",
    title: "Accessible UI",
    description: "An agent that iteratively edits a site's design to make it more accessible for people with conditions like dyslexia or arthritis.",
    image: "/projects/projects/accessible-ui.png",
    tags: ["LangChain", "Langflow", "Python"],
    githubLink: "https://github.com/row-huh/AccessibleUI",
    youtubeLink: "https://youtu.be/rG930Hee7OE",
    type: "archive",
  },
  {
    slug: "after-school",
    title: "After School",
    description: "A practical guide to essential life skills rarely taught in school — from social dynamics and time management to sustainable living and mental health.",
    image: "/projects/projects/afterschool.png",
    tags: ["Vertex AI", "React"],
    githubLink: "https://github.com/Laiba-lax/AfterSchool",
    liveDemoLink: "https://devpost.com/software/skinai-ufobl8",
    type: "archive",
  },
  {
    slug: "tic-tac-toe-ai",
    title: "Tic Tac Toe AI",
    description: "An unbeatable Tic-Tac-Toe AI that uses Minimax with Alpha-Beta pruning. It thinks ahead, plays smart, and never loses — ever.",
    image: "/projects/projects/tictactoeai.png",
    tags: ["Python", "Search", "Minimax"],
    githubLink: "https://github.com/row-huh/ticTacToeAI",
    liveDemoLink: "#",
    writeupLink: "/writing/how-computers-play-games",
    type: "passion",
  },
  {
    slug: "portfolio-v2",
    title: "Portfolio v2",
    description: "Second iteration - I ditched it because it look wayy too generic",
    image: "/projects/projects/portfoliov2.png",
    tags: ["React", "Nextjs", "TypeScript"],
    githubLink: "",
    liveDemoLink: "https://roha-dev-v2.vercel.app/",
    type: "passion",
  }
]

export type FeaturedMedia =
  | { kind: "image"; src: string; alt: string }
  | { kind: "video"; src: string; label: string }
  | { kind: "iframe"; src: string; title: string }
  | { kind: "code"; language: string; filename: string; code: string }

export interface FeaturedProject {
  slug: string
  eyebrow: string
  title: string
  summary: string
  status?: string
  stack: string[]
  specs?: { label: string; value: string }[]
  howItWorks: string[]
  links: { label: string; href: string; kind: "github" | "live" | "writeup" }[]
  media: FeaturedMedia
}

export const featuredProjects: FeaturedProject[] = [
  {
    slug: "llm-from-scratch",
    eyebrow: "Deep learning",
    title: "LLM from Scratch",
    summary:
      "A GPT-2 style decoder-only transformer written by hand in PyTorch, following Sebastian Raschka's Build a Large Language Model From Scratch.",
    status: "In progress: fine-tuning for classification",
    stack: ["Python", "PyTorch", "tiktoken", "Jupyter"],
    specs: [
      { label: "params", value: "124M" },
      { label: "layers", value: "12" },
      { label: "heads", value: "12" },
      { label: "emb dim", value: "768" },
      { label: "vocab", value: "50,257" },
      { label: "context", value: "1,024" },
    ],
    howItWorks: [
      "Text is tokenized with GPT-2's BPE vocabulary and sampled into input/target pairs with a sliding window.",
      "Multi-head causal self-attention, LayerNorm, GELU and the feed-forward block are each implemented as their own nn.Module, not imported.",
      "Pretrained on unlabeled text with next-token prediction; a sibling repo, shakespeareGPT, trains the same architecture on Shakespeare.",
    ],
    links: [
      { label: "Repo", href: "https://github.com/row-huh/llm-from-scratch", kind: "github" },
      { label: "shakespeareGPT", href: "https://github.com/row-huh/shakespeareGPT", kind: "github" },
      { label: "Read the notes", href: "/writing/llms-from-scratch", kind: "writeup" },
    ],
    media: {
      kind: "code",
      language: "python",
      filename: "src/GPT.py",
      code: `class MultiHeadAttention(nn.Module):
    def forward(self, x):
        b, num_tokens, d_in = x.shape

        keys = self.W_key(x)  # Shape: (b, num_tokens, d_out)
        queries = self.W_query(x)
        values = self.W_value(x)

        # (b, num_tokens, d_out) -> (b, num_heads, num_tokens, head_dim)
        keys = keys.view(b, num_tokens, self.num_heads, self.head_dim).transpose(1, 2)
        queries = queries.view(b, num_tokens, self.num_heads, self.head_dim).transpose(1, 2)
        values = values.view(b, num_tokens, self.num_heads, self.head_dim).transpose(1, 2)

        # Scaled dot-product attention with a causal mask
        attn_scores = queries @ keys.transpose(2, 3)
        mask_bool = self.mask.bool()[:num_tokens, :num_tokens]
        attn_scores.masked_fill_(mask_bool, -torch.inf)

        attn_weights = torch.softmax(attn_scores / keys.shape[-1]**0.5, dim=-1)
        attn_weights = self.dropout(attn_weights)

        context_vec = (attn_weights @ values).transpose(1, 2)
        context_vec = context_vec.contiguous().view(b, num_tokens, self.d_out)
        return self.out_proj(context_vec)`,
    },
  },
  {
    slug: "llm-explainer",
    eyebrow: "Interactive explainer",
    title: "Inside the Transformer",
    summary:
      "A step-by-step walkthrough of what GPT-2 does to a prompt, from raw text to the next-token distribution. Type a sentence and follow it through the model.",
    stack: ["JavaScript", "HTML", "CSS", "No framework"],
    specs: [
      { label: "stages", value: "11" },
      { label: "dependencies", value: "0" },
    ],
    howItWorks: [
      "Eleven stages: BPE tokenization, vocabulary lookup, token and positional embeddings, the transformer block, Q·K·V self-attention, the feed-forward network, the 12-layer stack and the output distribution.",
      "Every stage renders tensors at GPT-2's real shapes (768-dim embeddings, 12 heads, 50,257-token vocabulary).",
      "The numbers are deterministic illustrations, not a live model: the goal is to show the mechanics, not to run inference.",
    ],
    links: [
      { label: "Open full screen", href: "/llm-viz/index.html", kind: "live" },
      { label: "Repo", href: "https://github.com/row-huh/llm-visualizations", kind: "github" },
    ],
    media: { kind: "iframe", src: "/llm-viz/index.html", title: "Interactive GPT-2 explainer" },
  },
  {
    slug: "court-of-whispers",
    eyebrow: "Games + LLM agents",
    title: "Court of Whispers",
    summary:
      "A political espionage RPG where every NPC is an LLM agent with its own goals. You have five days to talk four of them into a coup while one of them gathers proof against you. Built with Usaib Ahmed.",
    stack: ["Godot 4", "GDScript", "TanStack Start", "Cloudflare Workers", "LLM API"],
    specs: [
      { label: "agents", value: "4" },
      { label: "days", value: "5" },
      { label: "whispers / day", value: "5" },
      { label: "targets", value: "Web + Android" },
    ],
    howItWorks: [
      "The Godot client only handles input, rendering and physics. A stateless server on Cloudflare Workers generates dialogue and is the arbiter of game state.",
      "Each conversation moves trust, suspicion and proof scores; the win condition is computed server-side and synced to the client at day transitions.",
      "NPCs run a physics-driven state machine: bounded wander zones, navigation-mesh snapping on spawn and displacement-based stuck recovery.",
      "Agent replies are capped to a short sentence, which keeps the cost of several concurrent LLM calls per player under control.",
    ],
    links: [
      { label: "Repo", href: "https://github.com/row-huh/court-of-whispers-godot", kind: "github" },
      {
        label: "Read the write-up",
        href: "/writing/dynamic-games-with-autonomous-agents-and-no-clear-end-goals",
        kind: "writeup",
      },
    ],
    media: { kind: "video", src: "/projects/court-of-whispers.mp4", label: "Court of Whispers looping demo clip" },
  },
  {
    slug: "physiotherapy-guidance-system",
    eyebrow: "Computer vision",
    title: "Physiotherapy Guidance System",
    summary:
      "A doctor records an exercise once; the system learns the correct form from that video and then scores a patient's reps live from their webcam.",
    stack: ["Next.js", "TypeScript", "MediaPipe Pose", "Supabase", "K-Means", "One Euro Filter"],
    specs: [
      { label: "landmarks", value: "33 × 3D" },
      { label: "inference", value: "in-browser" },
      { label: "form score", value: "0 to 100" },
    ],
    howItWorks: [
      "MediaPipe Pose Landmarker extracts 33 3D landmarks per frame in the browser; a custom One Euro Filter removes jitter without lagging fast movement.",
      "Joint and segment angles are computed from the landmarks, then K-Means clusters the doctor's reference video into a sequence of exercise states with expected angle ranges.",
      "The patient's live angles are matched to those states, per-rep deviation is normalized against each angle's range and rolled into a form score.",
      "Feedback comes back as audio cues and a skeleton overlay, and sessions are stored in Supabase.",
    ],
    links: [
      { label: "Live", href: "https://physio-therapy-web-xi.vercel.app", kind: "live" },
      { label: "Repo", href: "https://github.com/row-huh/physio-therapy-web", kind: "github" },
    ],
    media: {
      kind: "code",
      language: "text",
      filename: "pipeline",
      code: `Webcam feed
  -> MediaPipe Pose Landmarker      L ∈ ℝ^(33×3)
  -> One Euro Filter                adaptive smoothing
  -> Angle computation              θ_joint, θ_segment
  -> K-Means state matching         s*(t) = argmin |x_primary − μ_primary|
  -> Deviation vector               ε(t), normalized per angle range
  -> Form score                     F = max(0, 100 − mean(‖ε‖₁) / 2)
  -> Feedback                       audio cues + skeleton overlay`,
    },
  },
  {
    slug: "gif2ascii",
    eyebrow: "Tooling",
    title: "gif2ascii",
    summary:
      "Converts animated GIFs into ASCII animations, entirely in the browser. Nothing is uploaded; a Rust CLI is in the works.",
    stack: ["TypeScript", "React", "Canvas API", "gifenc", "Rust (CLI, WIP)"],
    specs: [
      { label: "char ramp", value: "@%#*+=-:. " },
      { label: "server", value: "none" },
    ],
    howItWorks: [
      "Each frame is drawn to a canvas and downsampled to a character grid.",
      "Per-cell brightness is 0.299R + 0.587G + 0.114B, shifted by the luminosity setting and stretched around the midpoint by the contrast setting.",
      "Brightness is normalized against the frame's own min and max, then mapped onto a 10-character ramp.",
      "Frames are re-encoded to a GIF with gifenc, or exported as text.",
    ],
    links: [
      { label: "Try it", href: "https://gif-to-ascii.vercel.app", kind: "live" },
      { label: "Repo", href: "https://github.com/row-huh/gif-to-ascii", kind: "github" },
    ],
    media: { kind: "image", src: "/projects/gif2ascii.gif", alt: "gif2ascii animated demo" },
  },
]

export const projectDetails = projects.reduce((acc, project) => {
  acc[project.slug] = project
  return acc
}, {} as Record<string, Project>)
