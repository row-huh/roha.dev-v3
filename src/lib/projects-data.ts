export interface Project {
  slug: string
  title: string
  description: string
  image: string
  tags: string[]
  githubLink?: string
  liveDemoLink?: string
  youtubeLink?: string
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
    description: "Applying deep learning to assist in the analysis of medical images for diagnostic support.",
    image: "/projects/projects/neutral.png",
    tags: ["AI", "ML", "Streamlit", "Flask"],
    githubLink: "https://github.com/TechEvents-BUDS/Tecna-s-Tribe_Techathon/",
    liveDemoLink: "#",
    type: "archive",
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
    type: "hackathon",
  },
  {
    slug: "malama-ai",
    title: "MalamaAI- Skin Disease Detection",
    description: "MalamaAI detects skin diseases using ml model based off of dinov2 deployed on a webapp built with Next.js and Flask, it also uses Llama 3.370b model for accurate analysis. ",
    image: "/projects/projects/malama.png",
    tags: ["ML", "Next.js", "Flask", "Llama", "DinoV2"],
    githubLink: "https://github.com/row-huh/MalamaAI",
    liveDemoLink: "#",
    type: "hackathon",
  },
  {
    slug: "accessible-ui",
    title: "Accessible UI",
    description: "A high-performance dashboard for visualizing streaming data with interactive charts and alerts.",
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
    type: "hackathon",
  }
]

export const projectDetails = projects.reduce((acc, project) => {
  acc[project.slug] = project
  return acc
}, {} as Record<string, Project>)
