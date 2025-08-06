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
      image: "/placeholder.svg?height=400&width=800&text=LLM+from+Scratch+Detail",
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
      image: "/placeholder.svg?height=200&width=300&text=Decentralized+ID",
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
    image: "/placeholder.svg?height=400&width=800&text=Bias+Detection+Project",
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
            <img src="/placeholder.svg?height=200&width=300&text=Pethia+Screenshot" alt="Pethia Bot Conversation" class="my-4 rounded-lg shadow-lg">
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
      "image": "/placeholder.svg?height=200&width=300&text=Decentralized+ID",
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
    "image": "/placeholder.svg?height=200&width=300&text=Decentralized+ID",
    "githubLink": "",
    "liveDemoLink": ""
  }, 
  "metallica-osu": {
    "title": "Metallica OSU",
    "description": `
        <p class="mb-4">
          Metallica OSU is a rhythm game inspired by OSU and Guitar Hero, exclusively featuring Metallica's music. This project was a personal challenge I undertook when I first started learning JavaScript. My goal was to build a complex rhythm game from scratch without any AI assistance, a challenge I ultimately set aside to explore other technologies.
        </p>
        <p class="mb-4">
          The core technical hurdle I couldn't overcome was splitting a single song into separate instrumental tracks for the drums, rhythm, and lead guitar. While I managed to find individual drum samples online, the next challenge was associating each drum hit with a specific key at the correct time. I designed a data structure to handle this (e.g., <code>key: A, time: 0.2, sound:1.mp3</code>), but encountered two major problems: the immense amount of manual work required to split the drum samples into tiny, perfectly-timed pieces, and a significant audio delay that I was unable to fix. This painstaking process, combined with the difficulty of perfectly cutting each sample without it interfering with others, ultimately proved to be a "giant mess."
        </p>
        <p class="mb-4">
          Despite the project's incomplete state, it served as a crucial stepping stone in my development journey. It led me to discover and begin exploring more modern frameworks and languages like TypeScript, React, and Next.js. Despite being an archived project, it holds a special place as a hobby, and I look forward to revisiting and continuing to work on it in the future, reinforcing that coding is not just a profession, but also a passion.
        </p>
        <h3 class="text-2xl font-medium text-white mb-4 mt-8">Key Highlights:</h3>
        <ul class="list-disc list-inside text-gray-300 mb-4">
          <li>A rhythm game concept based on Metallica's discography.</li>
          <li>An early personal challenge that exposed me to complex audio synchronization problems.</li>
          <li>Technical challenges included splitting audio tracks, manual sample cutting, and significant audio delay issues.</li>
          <li>Pivoted to explore modern frameworks, but remains a passion project for the future.</li>
        </ul>
        <h3 class="text-2xl font-medium text-white mb-4 mt-8">Technologies Used:</h3>
        <ul class="list-disc list-inside text-gray-300 mb-4">
          <li>TypeScript</li>
          <li>Next.js</li>
          <li>React</li>
        </ul>
      `,
    "image": "/placeholder.svg?height=200&width=300&text=Course+Management",
    "githubLink": "https://github.com/row-huh/metallica-osu",
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

  "expense-tracker": {
  "title": "Expense Tracker",
  "description": `
      <p class="mb-4">
        The Expense Tracker is a practical tool designed to help users manage, track, and analyze their transactional data. It provides a simple and intuitive interface for adding, updating, and viewing expenses, making it easy to stay on top of personal finances. A key feature of the application is the ability to upload receipts, helping users keep a digital record of their purchases.
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
  "image": "/placeholder.svg?height=200&width=300&text=Database+Design",
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
  "image": "/placeholder.svg?height=200&width=300&text=Portfolio",
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
  "image": "/placeholder.svg?height=200&width=300&text=Dashboard",
  "githubLink": "https://github.com/row-huh/AccessibleUI",
  "liveDemoLink": "https://youtu.be/rG930Hee7OE"
  },
  "ad-blaster": {
  "title": "Ad Blaster",
  "description": `
      <p class="mb-4">
        Ad Blaster is a game concept where the player's objective is to "blast" advertisements, with a unique twist: these are real ads, and by interacting with them, the game's creator would generate revenue. The core idea aimed to gamify ad interaction and create an engaging, albeit unconventional, monetization model.
      </p>
      <p class="mb-4">
        However, the project encountered significant technical and policy challenges that prevented its full realization. Firstly, ad providers like AdSense were not compatible with this interactive, "blastable" ad model. Secondly, even if an alternative ad provider could be found, a major hurdle was figuring out how to make the ads interactive and "blastable" within the game environment without them automatically opening in a new browser tab, which would break the game experience. These issues highlighted the complexities of integrating real-world advertising into a game in a novel way.
      </p>
      <h3 class="text-2xl font-medium text-white mb-4 mt-8">Key Highlights:</h3>
      <ul class="list-disc list-inside text-gray-300 mb-4">
        <li>Innovative game concept to "blast" real-world ads for revenue.</li>
        <li>Faced challenges with ad provider policies (e.g., AdSense).</li>
        <li>Technical difficulty in preventing ads from opening new tabs upon interaction.</li>
      </ul>
      <h3 class="text-2xl font-medium text-white mb-4 mt-8">Technologies Used:</h3>
      <ul class="list-disc list-inside text-gray-300 mb-4">
        <li>React</li>
        <li>TypeScript</li>
        <li>Next.js</li>
      </ul>
    `,
  "image": "/placeholder.svg?height=200&width=300&text=Dashboard",
  "githubLink": "",
  "liveDemoLink": ""
}, 
"roha.dev": {
  "title": "roha.dev v1",
  "description": `
      <p class="mb-4">
        This project was the very first iteration of my personal domain, roha.dev. It was a classic static blog site built using the Jekyll framework and deployed on GitHub Pages. At the time, I was a complete beginner and relied on the "Chirpy" template to get the site up and running.
      </p>
      <p class="mb-4">
        The site served its purpose for a while, but it ran into a major technical issue: something would consistently break whenever I tried to add a new blog post. As a beginner, I found the debugging process for Jekyll to be a significant time sink. Recognizing that my time was better spent on new projects, I decided to archive this version and move on to a new approach with roha.dev-v2.
      </p>
      <h3 class="text-2xl font-medium text-white mb-4 mt-8">Key Highlights:</h3>
      <ul class="list-disc list-inside text-gray-300 mb-4">
        <li>The first iteration of my personal blog site.</li>
        <li>Built on Jekyll and deployed on GitHub Pages.</li>
        <li>Used a pre-existing template to learn the basics of static site generation.</li>
        <li>Demonstrates an early approach to content management and web development.</li>
      </ul>
      <h3 class="text-2xl font-medium text-white mb-4 mt-8">Technologies Used:</h3>
      <ul class="list-disc list-inside text-gray-300 mb-4">
        <li>Jekyll</li>
      </ul>
    `,
  "image": "/placeholder.svg?height=200&width=300&text=Dashboard",
  "githubLink": "https://github.com/row-huh/roha.dev",
  "liveDemoLink": ""
}, 
"nutritional-management-system": {
  "title": "Nutritional Management System",
  "description": `
      <p class="mb-4">
        The Nutritional Management System is a tool built for nutritionists to efficiently track and manage their patients. It allows them to store and view patient details, recommend specific diets, and access a database of foods with their detailed nutritional information, including calories, fats, and sugars. This was a foundational project, as it was the first time I attempted to integrate a database into an application.
      </p>
      <p class="mb-4">
        However, the database integration, specifically with OracleDB, proved to be a giant disaster. This project's development was a series of intense challenges that ultimately pushed me to switch operating systems and gave me a healthy respect for the complexities of enterprise software. The sheer amount of troubleshooting and hustling I had to do for this project is a story in itself. For a more comprehensive view into this panic attack of a project, you can read about it <a href="/writing/oracle-db" class="text-blue-400 hover:underline">here</a>.
      </p>
      <h3 class="text-2xl font-medium text-white mb-4 mt-8">Key Highlights:</h3>
      <ul class="list-disc list-inside text-gray-300 mb-4">
        <li>A management tool for nutritionists to track patients and food data.</li>
        <li>My first project to include a database, demonstrating foundational backend skills.</li>
        <li>Involved a disastrous but formative experience with OracleDB integration.</li>
        <li>Highlights the challenges of working with complex enterprise software.</li>
      </ul>
      <h3 class="text-2xl font-medium text-white mb-4 mt-8">Technologies Used:</h3>
      <ul class="list-disc list-inside text-gray-300 mb-4">
        <li>OracleSQL</li>
        <li>Python (Flask)</li>
        <li>JavaScript</li>
      </ul>
    `,
  "image": "/placeholder.svg?height=200&width=300&text=Legacy+Blog",
  "githubLink": "https://github.com/row-huh/Nutritional-Management-System",
  "liveDemoLink": ""
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
  "image": "/placeholder.svg?height=200&width=300&text=Calculator+App",
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
  "image": "/placeholder.svg?height=200&width=300&text=Old+Portfolio",
  "githubLink": "https://github.com/row-huh/ticTacToeAI",
  "liveDemoLink": ""
}, 
"bonnie": {
  "title": "Bonnie",
  "description": `
      <p class="mb-4">
        Bonnie is the first Discord bot I ever created and holds a special place in my learning journey. He was designed as a simple, rule-based chatbot that would respond to a series of pre-coded prompts. This was a fun and personal exploration into bot development and conversational AI, created long before the widespread use of models like GPT.
      </p>
      <p class="mb-4">
        The bot was inspired by Yui, another popular Discord bot at the time that had a similar conversational style but a much larger feature set. My intention was to create a friendly assistant with a distinct personality, and while the project was a humble beginning, it set the stage for more ambitious projects down the line.
      </p>
      <h3 class="text-2xl font-medium text-white mb-4 mt-8">Key Highlights:</h3>
      <ul class="list-disc list-inside text-gray-300 mb-4">
        <li>My first-ever Discord bot, a passion project for a personal assistant.</li>
        <li>A simple, rule-based chatbot that responds to pre-coded prompts.</li>
        <li>Inspired by the bot "Yui", created in a pre-GPT era.</li>
      </ul>
      <h3 class="text-2xl font-medium text-white mb-4 mt-8">Technologies Used:</h3>
      <ul class="list-disc list-inside text-gray-300 mb-4">
        <li>Python</li>
        <li>LLM APIs</li>
      </ul>
    `,
  "image": "/placeholder.svg?height=200&width=300&text=Old+Portfolio",
  "githubLink": "",
  "liveDemoLink": ""
}, 

  }
