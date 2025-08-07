export const projectDetails = {
    "llm-from-scratch": {
      title: "LLM from Scratch: Unveiling the Transformer",
      description: `
        <p class="mb-4">
        This project is a deep dive into the foundational architecture of Large Language Models (LLMs). Instead of relying on existing frameworks, I embarked on the journey of building a transformer model from first principles using PyTorch.
        </p>
        <p class="mb-4">
        The goal was to gain a profound understanding of how these complex models work, from tokenization and embedding layers to multi-head attention mechanisms and feed-forward networks. It involved implementing the core components, understanding the mathematical underpinnings, and training a small-scale model on a custom dataset.
        </p>
        <h3 class="text-2xl font-medium text-white mb-4 mt-8">Key Learnings:</h3>
        <ul class="list-disc list-inside text-gray-300 mb-4">
          <li>In-depth understanding of self-attention and multi-head attention.</li>
          <li>Implementation of positional encodings and their importance.</li>
          <li>Grasping the intricacies of encoder-decoder architectures.</li>
          <li>Optimizing training loops and managing computational resources.</li>
          <li>Debugging complex neural network structures.</li>
        </ul>
        <p class="mb-4">This project solidified my theoretical knowledge of deep learning and provided invaluable practical experience in building and debugging large-scale neural networks. It's a testament to the power of understanding the fundamentals.</p>
        <h3 class="text-2xl font-medium text-white mb-4 mt-8">Technologies Used:</h3>
        <ul class="list-disc list-inside text-gray-300 mb-4">
          <li>Python</li>
          <li>PyTorch</li>
          <li>NumPy</li>
          <li>Hugging Face Datasets (for data loading)</li>
        </ul>
        <p class="mb-4">While this model isn't production-ready, the insights gained are directly applicable to working with and fine-tuning state-of-the-art LLMs.</p>
      `,
      image: "/projects/highlight/llm-from-scratch.png",
      githubLink: "https://github.com/row-huh/llm-from-scratch",
      liveDemoLink: "#", // Placeholder for live demo
    },
      "malama-ai": {
      title: "MalamaAI – Skin Disease Detection",
      description: `
        <p class="mb-4">
          MalamaAI is a machine learning-powered application designed to recognize a variety of skin diseases using state-of-the-art computer vision techniques. The name <em>“Malama”</em>, meaning “to care for” in Hawaiian, reflects the project’s goal — to extend the reach of early detection and care through accessible technology.
        </p>
        <p class="mb-4">
          At the heart of MalamaAI is a custom AI pipeline that builds upon a fine-tuned version of <strong>DinoV2</strong>, a robust self-supervised vision transformer. To further enhance its diagnostic capabilities, we integrated the <strong>Llama 3.370b</strong> language model, enabling the system to generate human-readable, context-aware reports based on image analysis results.
        </p>
        <h3 class="text-2xl font-medium text-white mb-4 mt-8">Features:</h3>
        <ul class="list-disc list-inside text-gray-300 mb-4">
          <li><strong>Interactive Frontend:</strong> Built using Next.js for a responsive and smooth user experience.</li>
          <li><strong>Scalable Backend:</strong> Flask-powered API server that efficiently handles image uploads and model inference.</li>
          <li><strong>Enhanced Model Stack:</strong> Fine-tuned DinoV2 for image classification, combined with Llama 3.370b for natural language explanations and guidance.</li>
        </ul>
        <p class="mb-4">
          MalamaAI aims to support users with accessible, AI-powered insights into their skin health. While not a substitute for medical professionals, the tool is a step toward democratizing health diagnostics using machine learning.
        </p>
        <h3 class="text-2xl font-medium text-white mb-4 mt-8">Technologies Used:</h3>
        <ul class="list-disc list-inside text-gray-300 mb-4">
          <li>DinoV2 (fine-tuned)</li>
          <li>Llama 3.370b</li>
          <li>Next.js</li>
          <li>Flask</li>
          <li>RESTful API integration</li>
        </ul>
      `,
      image: "/placeholder.svg?height=200&width=300&text=Chatbot+Platform",
      githubLink: "https://github.com/row-huh/MalamaAI", // Placeholder
      liveDemoLink: "#"
    },
      "time-venturers": {
      title: "Time Venturers – Text Based RPG",
      description: `
        <p class="mb-4">
          <strong>Time Venturers</strong> is a text-based role-playing game set in a cyberpunk dystopian future. Inspired by the world of <em>Cyberpunk: Edgerunners</em>, the story throws the player into the year 2094 — a gritty, tech-infused world where identities are blurred and danger lurks in every decision. The player awakens with no memory of how they arrived or who brought them here, and must unravel the mystery by exploring their surroundings, making choices, and surviving the consequences.
        </p>
        <p class="mb-4">
          The game was built using pure Python, with no external libraries or fancy UI. All interactions happen via the command line, and the gameplay is driven entirely by simple loops, conditionals, and a well-structured narrative flow. Despite its minimalism, it delivers a surprisingly immersive experience.
        </p>
        <h3 class="text-2xl font-medium text-white mb-4 mt-8">Key Highlights:</h3>
        <ul class="list-disc list-inside text-gray-300 mb-4">
          <li>Branching narrative set in a dark futuristic world.</li>
          <li>Built entirely with CLI and Python — no dependencies.</li>
          <li>Choices determine how the story unfolds.</li>
          <li>Solo-developed in just 3 days, including story, logic, and code.</li>
        </ul>
        <p class="mb-4">
          This was one of the very first projects I ever coded — long before I had access to tools like GPT. At the time, even basic logic felt like a challenge, but it was an incredibly fun and formative experience that cemented my love for building with code.
        </p>
        <h3 class="text-2xl font-medium text-white mb-4 mt-8">Technologies Used:</h3>
        <ul class="list-disc list-inside text-gray-300 mb-4">
          <li>Python (CLI-based)</li>
          <li>No external libraries or frameworks</li>
        </ul>
      `,
      image: "/projects/projects/time-venturers.png",
      githubLink: "https://github.com/row-huh/time-ventures",
      liveDemoLink: "https://www.youtube.com/watch?v=2ck6IDWG4Kc&t=15s&pp=ygUKcm9oYXRoZWRldg%3D%3D"
    },
    "neutral": {
    title: "Neutral – Detecting Subconscious Bias in Recruitment",
    description: `
      <p class="mb-4">
        <strong>Neutral</strong> was a hackathon project aimed at addressing subconscious bias in recruitment processes. Recruiters — like all of us — can carry unintentional biases that seep into decision-making. The idea was to build a tool that could objectively assess hiring decisions and flag potential bias based on the language used in CVs and rejection/acceptance letters.
      </p>
      <p class="mb-4">
        Users would upload a candidate's CV alongside a decision document (e.g., rejection letter). Our model, built using basic ML pipelines and Streamlit for the interface, would parse the content, extract relevant features, and then offer a judgment — either supporting or questioning the fairness of the decision.
      </p>
      <h3 class="text-2xl font-medium text-white mb-4 mt-8">Key Learnings & Honest Reflection:</h3>
      <ul class="list-disc list-inside text-gray-300 mb-4">
        <li>The project aligned with SDG goals related to gender equality, decent work, and reducing inequalities.</li>
        <li>Developed a basic ML model to analyze hiring decisions from textual inputs.</li>
        <li>Built a clean and functional Streamlit frontend for quick deployment and testing.</li>
        <li>Placed 6th out of 57 teams in a hackathon — despite realizing the approach was fundamentally flawed.</li>
      </ul>
      <p class="mb-4">
        While the idea sounded noble, in execution, it was overly simplistic and leaned on many assumptions. Subconscious bias isn’t easily quantifiable by ML, and attempting to "approve" or "reject" a human decision via a few text cues quickly became... well, dumb. But hey — we learned a lot.
      </p>
      <p class="mb-4">
        I reflected more deeply on this experience in an article titled <a href="/writing/recruitment-bias" class="text-blue-400 underline">“Exploring Bias in Recruitment, an Attempt to Solve it – and Why It Was the Worst Idea Ever.”</a> If you’re curious about the pitfalls of applying AI to complex human problems, it’s worth a read.
      </p>
      <h3 class="text-2xl font-medium text-white mb-4 mt-8">Technologies Used:</h3>
      <ul class="list-disc list-inside text-gray-300 mb-4">
        <li>Python</li>
        <li>Streamlit</li>
        <li>Basic ML classification pipelines</li>
      </ul>
    `,
    image: "/projects/projects/neutral.png",
    githubLink: "https://github.com/row-huh/bias-in-recruitment",
  }, 
    "pethia": {
      title: "Pethia",
      description: `
          <p class="mb-4">
            Pethia is a sassy Discord chatbot known for its distinctive and personalized personality. This solo project was born out of a desire to have a bot that could hold its own in arguments, specifically designed to defend me in debates with my friends. The bot's core functionality was built to know exactly who it was talking to at any given moment, enabling it to deliver customized, roast-style responses based on each user's unique ID. This level of personalization was driven by an extensive, 10-page manual of instructions I wrote to define her personality and rules.
          </p>
          <p class="mb-4">
            Built privately, but here's a screenshot of how it really was:<br>
            <img src="/projects/demo/peth-demo2.png" alt="Pethia Bot Conversation" class="my-4 rounded-lg shadow-lg">

          </p>
          <p class="mb-4">
            The project was a formative experience, pushing me to build a complex, rule-based system from the ground up. Because the instructions and logic contain private information tailored to my friends, the bot's GitHub repository remains private.
          </p>
          <h3 class="text-2xl font-medium text-white mb-4 mt-8">Key Highlights:</h3>
          <ul class="list-disc list-inside text-gray-300 mb-4">
            <li>A rule-based chatbot with a unique and witty personality.</li>
            <li>Personalized responses based on user IDs.</li>
            <li>Solo-developed with over 10 pages of custom instructions.</li>
            <li>Built for private use within a Discord server.</li>
          </ul>
          <h3 class="text-2xl font-medium text-white mb-4 mt-8">Technologies Used:</h3>
          <ul class="list-disc list-inside text-gray-300 mb-4">
            <li>Python</li>
            <li>Discord.py</li>
            <li>External APIs</li>
          </ul>

        `,
      "image": "/projects/projects/pethia.png",
      "githubLink": "",
      "liveDemoLink": ""
    }, 
    "bool": {
    "title": "Bool",
    "description": `
        <p class="mb-4">
          Bool is a simple, rule-based Discord bot that was one of my very first coding projects. Developed using Python and the Discord.py library, the bot's functionality was straightforward: it would respond to a set of pre-coded prompts. This project was a foundational learning experience in bot development and a fun way to get started with coding.
        </p>
        <p class="mb-4">
          The bot was inspired by another Discord bot named Yui, which performed similar functions but on a much larger scale with more commands. Bool, in contrast, was designed to be a minimalist and simple bot, focusing on core functionality and my initial learning journey.
        </p>
        <h3 class="text-2xl font-medium text-white mb-4 mt-8">Key Highlights:</h3>
        <ul class="list-disc list-inside text-gray-300 mb-4">
          <li>One of my very first projects, focused on foundational coding skills.</li>
          <li>A simple, rule-based bot that responds to pre-coded prompts.</li>
          <li>Inspired by the bot "Yui".</li>
        </ul>
        <h3 class="text-2xl font-medium text-white mb-4 mt-8">Technologies Used:</h3>
        <ul class="list-disc list-inside text-gray-300 mb-4">
          <li>Python</li>
          <li>Discord.py</li>
        </ul>
      `,
    "image": "/projects/projects/bool.png",
    "githubLink": "",
    "liveDemoLink": ""
  }, 

  "relic": {
  "title": "Relic",
  "description": `
      <p class="mb-4">
        Relic is a powerful tool designed to help users search through an entire historical archive of data to correlate current information with the past. The project was built to enable a deeper understanding of how events, headlines, and public narratives have evolved over time. It allows users to query a vast library of historical articles and instantly see how topics were covered across different eras.
      </p>
      <p class="mb-4">
        This tool empowers users to perform their own narrative analysis, spotting trends and shifting themes that might be missed with a single-point-in-time search. Its modern, responsive UI was crafted with a clean, user-friendly experience in mind, making it easy to navigate a large historical dataset.
      </p>
      <h3 class="text-2xl font-medium text-white mb-4 mt-8">Key Highlights:</h3>
      <ul class="list-disc list-inside text-gray-300 mb-4">
        <li><strong>Search Any Topic:</strong> Enter a keyword or topic to retrieve relevant headlines from multiple time periods.</li>
        <li><strong>Timeline Comparison:</strong> Instantly compare how headlines and media coverage have changed over time.</li>
        <li><strong>Narrative Analysis:</strong> Spot trends, recurring themes, and shifting narratives in news media.</li>
        <li><strong>Modern & Responsive UI:</strong> Built with HTML, CSS, and JavaScript for a clean, user-friendly experience.</li>
      </ul>
      <h3 class="text-2xl font-medium text-white mb-4 mt-8">Technologies Used:</h3>
      <ul class="list-disc list-inside text-gray-300 mb-4">
        <li>PHP</li>
        <li>MySQL</li>
        <li>JavaScript</li>
        <li>HTML</li>
        <li>CSS</li>
      </ul>
    `,
  "image": "/relic.png",
  "githubLink": "",
  "liveDemoLink": ""
  },

  "goldfish-expense-tracker": {
  "title": "Gold Fish",
  "description": `
      <p class="mb-4">
        Gold Fish is a practical tool designed to help users manage, track, and analyze their transactional data. It provides a simple and intuitive interface for adding, updating, and viewing expenses, making it easy to stay on top of personal finances. A key feature of the application is the ability to upload receipts, helping users keep a digital record of their purchases.
      </p>
      <p class="mb-4">
        This project was built to be a straightforward and functional application, demonstrating the power of a rapid development framework for creating data-driven tools. It allows users to gain a clear overview of their spending habits and manage their budget effectively.
      </p>
      <h3 class="text-2xl font-medium text-white mb-4 mt-8">Key Highlights:</h3>
      <ul class="list-disc list-inside text-gray-300 mb-4">
        <li>Tool to track, manage, add, and update transactional information.</li>
        <li>Ability to upload and store receipts digitally.</li>
        <li>Provides a clear overview of expenses and spending habits.</li>
      </ul>
      <h3 class="text-2xl font-medium text-white mb-4 mt-8">Technologies Used:</h3>
      <ul class="list-disc list-inside text-gray-300 mb-4">
        <li>Streamlit</li>
        <li>Python</li>
        <li>External APIs</li>
      </ul>
    `,
  "image": "/projects/projects/goldfish.png",
  "githubLink": "https://github.com/row-huh/Expense-Tracker",
  "liveDemoLink": ""
  },
  "portfolio-v3": {
  "title": "Portfolio v3",
  "description": `
      <p class="mb-4">
        This project is the third iteration of my personal portfolio, which you are currently viewing. The primary goal of this version was to move beyond simple web development and focus on the art of storytelling and modern UI/UX design. The entire site was built to be a narrative experience, guiding the user through my journey and projects in a cohesive and engaging way.
      </p>
      <p class="mb-4">
        To achieve a seamless user experience, the site integrates an external service. It uses Formspree to handle form submissions, highlighting the project's focus on user engagement over pure technical implementation.
      </p>
      <h3 class="text-2xl font-medium text-white mb-4 mt-8">Key Highlights:</h3>
      <ul class="list-disc list-inside text-gray-300 mb-4">
        <li>A third-generation personal portfolio.</li>
        <li>Focus on modern UI/UX and storytelling.</li>
        <li>Integration with an external API for forms (Formspree).</li>
      </ul>
      <h3 class="text-2xl font-medium text-white mb-4 mt-8">Technologies Used:</h3>
      <ul class="list-disc list-inside text-gray-300 mb-4">
        <li>Next.js</li>
        <li>React</li>
        <li>TypeScript</li>
        <li>Tailwind CSS</li>
        <li>Framer Motion</li>
      </ul>
    `,
  "image": "/projects/projects/portfoliov3.png",
  "githubLink": "https://github.com/row-huh/roha.dev-v3",
  "liveDemoLink": "/"
  }, 
  "accessible-ui": {
  "title": "Accessible UI",
  "description": `
      <p class="mb-4">
        Accessible UI was a hackathon project built to help web developers create more inclusive and user-friendly websites. The core idea behind the tool is to assist in the process of making websites accessible to users with various disabilities, such as arthritis or dyslexia.
      </p>
      <p class="mb-4">
        The system was envisioned to take existing web design or code and automatically suggest or implement changes to ensure compatibility with Web Content Accessibility Guidelines (WCAG). While I believe the core concept is a cool idea, I was not able to properly execute it during the hackathon. Despite the challenges, the project remains a testament to an innovative approach to improving web accessibility.
      </p>
      <h3 class="text-2xl font-medium text-white mb-4 mt-8">Key Highlights:</h3>
      <ul class="list-disc list-inside text-gray-300 mb-4">
        <li>A hackathon project focused on web accessibility.</li>
        <li>Innovative concept for a tool to make sites WCAG-compatible.</li>
        <li>Designed to assist users with disabilities like arthritis and dyslexia.</li>
        <li>Demonstrates a great idea, even with execution challenges.</li>
      </ul>
      <h3 class="text-2xl font-medium text-white mb-4 mt-8">Technologies Used:</h3>
      <ul class="list-disc list-inside text-gray-300 mb-4">
        <li>LangChain</li>
        <li>Langflow</li>
        <li>Python</li>
        <li>HTML/CSS</li>
      </ul>
    `,
  "image": "/projects/projects/accessible-ui.png",
  "githubLink": "https://github.com/row-huh/AccessibleUI",
  "liveDemoLink": "https://youtu.be/rG930Hee7OE"
  },


 


"after-school": {
  "title": "After School",
  "description": `
      <p class="mb-4">
        After School is an application designed to teach essential life skills that are rarely covered in traditional education. The project's name directly reflects its purpose: to provide a practical guide to the topics that truly matter "after school." These include critical skills such as organizational habits, financial management, time management, and sustainable living.
      </p>
      <p class="mb-4">
        Built with the power of modern AI, the application leverages Vertex AI agents to deliver personalized guidance and educational content. It provides a structured yet flexible learning environment for users to acquire and practice skills that can have a tangible impact on their daily lives.
      </p>
      <h3 class="text-2xl font-medium text-white mb-4 mt-8">Key Highlights:</h3>
      <ul class="list-disc list-inside text-gray-300 mb-4">
        <li>An educational app focused on practical, real-world life skills.</li>
        <li>Covers topics like organizational skills, financial management, and sustainability.</li>
        <li>The name "After School" directly represents the project's purpose.</li>
      </ul>
      <h3 class="text-2xl font-medium text-white mb-4 mt-8">Technologies Used:</h3>
      <ul class="list-disc list-inside text-gray-300 mb-4">
        <li>Vertex AI</li>
        <li>React</li>
        <li>Python (Flask)</li>
      </ul>
    `,
  "image": "/projects/projects/afterschool.png",
  "githubLink": "https://github.com/Laiba-lax/AfterSchool",
  "liveDemoLink": "https://devpost.com/software/skinai-ufobl8"
}, 
"tic-tac-toe-ai": {
  "title": "Tic Tac Toe AI",
  "description": `
      <p class="mb-4">
        This project is a nostalgic throwback to my early days in computer science, specifically a project for the CS50 AI course. It's an unbeatable Tic-Tac-Toe AI that is guaranteed to never lose. I poured my all into creating this project, and it holds a special place in my heart as a testament to my early passion for programming.
      </p>
      <p class="mb-4">
        The AI's formidable strength comes from its use of a sophisticated search algorithm known as Minimax. To make its decisions incredibly fast, I implemented Alpha-Beta pruning, which efficiently cuts down on the number of moves the AI needs to consider. The result is a lightning-fast and flawless opponent that will challenge even the most strategic human players.
      </p>
      <h3 class="text-2xl font-medium text-white mb-4 mt-8">Key Highlights:</h3>
      <ul class="list-disc list-inside text-gray-300 mb-4">
        <li>An unbeatable Tic-Tac-Toe AI developed for the CS50 AI course.</li>
        <li>Uses Minimax search algorithm for optimal gameplay.</li>
        <li>Optimized for speed with Alpha-Beta pruning.</li>
        <li>A perfect example of foundational AI and search concepts.</li>
      </ul>
      <h3 class="text-2xl font-medium text-white mb-4 mt-8">Technologies Used:</h3>
      <ul class="list-disc list-inside text-gray-300 mb-4">
        <li>Python</li>
        <li>Pygame</li>
        <li>Search Algorithms (Minimax, Alpha-Beta Pruning)</li>
      </ul>
    `,
  "image": "/projects/projects/tictactoeai.png",
  "githubLink": "https://github.com/row-huh/ticTacToeAI",
  "liveDemoLink": ""
}, 

"portfolio-v2": {
  "title": "Portfolio v2",
  "description": `
      <p class="mb-4">
        This was the second iteration of my personal portfolio. While it was technically functional and built with a modern stack, I ultimately decided to ditch it halfway through the development process because it felt too generic. The design, layout, and overall feel of the site lacked a personal touch—it did not reflect my unique personality, my story, or my journey as a developer.
      </p>
      <p class="mb-4">
        The experience of building this site taught me a crucial lesson: a portfolio should be more than just a list of projects. It should be a storytelling tool that reflects the person behind the code. This realization prompted me to "ditch" this version and start over with the intention of creating something that was truly "roha-ish"—a site with a narrative and a distinctive character.
      </p>
      <h3 class="text-2xl font-medium text-white mb-4 mt-8">Key Highlights:</h3>
      <ul class="list-disc list-inside text-gray-300 mb-4">
        <li>A technically sound but aesthetically generic portfolio that was abandoned mid-development.</li>
        <li>Taught the importance of personal branding and storytelling in a portfolio.</li>
        <li>Served as a stepping stone to the more personalized Portfolio v3.</li>
      </ul>
      <h3 class="text-2xl font-medium text-white mb-4 mt-8">Technologies Used:</h3>
      <ul class="list-disc list-inside text-gray-300 mb-4">
        <li>React</li>
        <li>Nextjs</li>
        <li>TypeScript</li>
      </ul>
    `,
  "image": "/projects/projects/portfoliov2.png",
  "githubLink": "",
  "liveDemoLink": "https://roha-dev-v2.vercel.app/"
}

  }
