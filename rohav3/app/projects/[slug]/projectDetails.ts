export const projectDetails = {
  "llm-from-scratch": {
    title: "LLM from Scratch: Unveiling the Transformer",
    description: `
      <p class="mb-4">This project is a deep dive into the foundational architecture of Large Language Models (LLMs). Instead of relying on existing frameworks, I embarked on the journey of building a transformer model from first principles using PyTorch.</p>
      <p class="mb-4">The goal was to gain a profound understanding of how these complex models work, from tokenization and embedding layers to multi-head attention mechanisms and feed-forward networks. It involved implementing the core components, understanding the mathematical underpinnings, and training a small-scale model on a custom dataset.</p>
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
  "portfolio-v3": {
    title: "Portfolio v3: A Modern Web Experience",
    description: `
      <p class="mb-4">This is the third iteration of my personal portfolio website, designed to showcase my evolution as a developer and AI engineer. The primary focus was on creating a highly performant, visually appealing, and responsive user experience.</p>
      <p class="mb-4">Leveraging the latest features of Next.js App Router, Tailwind CSS, and Framer Motion, I aimed for a fluid and interactive interface. Special attention was paid to subtle animations, a granular background, and a clean, professional aesthetic.</p>
      <h3 class="text-2xl font-medium text-white mb-4 mt-8">Design & Development Highlights:</h3>
      <ul class="list-disc list-inside text-gray-300 mb-4">
        <li>**Next.js App Router:** Utilized server components for optimal performance and data fetching.</li>
        <li>**Tailwind CSS:** For rapid and consistent styling, ensuring responsiveness across devices.</li>
        <li>**Framer Motion:** Implemented intricate animations for a dynamic and engaging user interface.</li>
        <li>**Interactive Background:** Custom-built parallax effects and subtle ambient elements.</li>
        <li>**MDX Integration:** For easily managing blog content and embedding React components within markdown.</li>
      </ul>
      <p class="mb-4">The project also includes a custom AI assistant integration, a Spotify 'Now Playing' widget, and carousels for testimonials and blog posts, demonstrating a range of modern web development techniques.</p>
      <h3 class="text-2xl font-medium text-white mb-4 mt-8">Technologies Used:</h3>
      <ul class="list-disc list-inside text-gray-300 mb-4">
        <li>Next.js 14</li>
        <li>React</li>
        <li>Tailwind CSS</li>
        <li>Framer Motion</li>
        <li>shadcn/ui</li>
        <li>Lucide React</li>
      </ul>
      <p class="mb-4">This portfolio serves as a living document of my skills and interests, constantly evolving with new technologies and projects.</p>
    `,
    image: "/placeholder.svg?height=400&width=800&text=Portfolio+v3+Detail",
    githubLink: "https://github.com/row-huh/roha-portfolio", // Assuming this is the repo for the current portfolio
    liveDemoLink: "/", // This is the current site
  },
  "ai-chatbot-platform": {
    title: "AI Chatbot Platform",
    description: `
      <p class="mb-4">This project involved building a scalable platform for deploying custom AI chatbots. It focuses on real-time interaction capabilities and robust backend infrastructure.</p>
      <p class="mb-4">Key features include user authentication, message history management, and integration with various AI models. The platform is designed to be flexible and extensible for different chatbot applications.</p>
      <h3 class="text-2xl font-medium text-white mb-4 mt-8">Technologies Used:</h3>
      <ul class="list-disc list-inside text-gray-300 mb-4">
        <li>Node.js</li>
        <li>WebSockets</li>
        <li>PostgreSQL</li>
        <li>Express.js</li>
      </ul>
      <p class="mb-4">This project demonstrates proficiency in building real-time, data-driven applications with AI integration.</p>
    `,
    image: "/placeholder.svg?height=400&width=800&text=AI+Chatbot+Platform+Detail",
    githubLink: "#",
    liveDemoLink: "#",
  },
  "decentralized-identity": {
    title: "Decentralized Identity Solution",
    description: `
      <p class="mb-4">This project explores blockchain-based solutions for secure and user-controlled digital identities. It aims to provide a robust framework for self-sovereign identity management.</p>
      <p class="mb-4">The solution leverages smart contracts and cryptographic principles to ensure data privacy and user autonomy, moving away from centralized identity providers.</p>
      <h3 class="text-2xl font-medium text-white mb-4 mt-8">Technologies Used:</h3>
      <ul class="list-disc list-inside text-gray-300 mb-4">
        <li>Blockchain (e.g., Ethereum)</li>
        <li>Solidity</li>
        <li>Web3.js</li>
        <li>Cryptography</li>
      </ul>
      <p class="mb-4">A deep dive into the future of digital identity and its implications for privacy and security.</p>
    `,
    image: "/placeholder.svg?height=400&width=800&text=Decentralized+Identity+Detail",
    githubLink: "#",
    liveDemoLink: "#",
  },
  "medical-image-analysis": {
    title: "Medical Image Analysis Tool",
    description: `
      <p class="mb-4">This project focuses on applying deep learning techniques to assist in the analysis of medical images for diagnostic support. It aims to improve the accuracy and speed of medical diagnoses.</p>
      <p class="mb-4">Utilizing convolutional neural networks (CNNs), the tool can identify patterns and anomalies in medical scans, providing valuable insights to healthcare professionals.</p>
      <h3 class="text-2xl font-medium text-white mb-4 mt-8">Technologies Used:</h3>
      <ul class="list-disc list-inside text-gray-300 mb-4">
        <li>Python</li>
        <li>TensorFlow / Keras</li>
        <li>OpenCV</li>
        <li>Medical Imaging Libraries (e.g., pydicom)</li>
      </ul>
      <p class="mb-4">A practical application of AI in healthcare, demonstrating the potential for technology to enhance human capabilities.</p>
    `,
    image: "/placeholder.svg?height=400&width=800&text=Medical+Image+Analysis+Detail",
    githubLink: "#",
    liveDemoLink: "#",
  },
  "hackathon-project-4": {
    title: "Smart Home Automation",
    description: `
      <p class="mb-4">Developed an IoT-based smart home system with voice control and energy monitoring capabilities. This project aimed to create an intuitive and efficient home automation experience.</p>
      <p class="mb-4">It integrates various sensors and actuators, allowing users to control lighting, temperature, and appliances through a centralized interface or voice commands.</p>
      <h3 class="text-2xl font-medium text-white mb-4 mt-8">Technologies Used:</h3>
      <ul class="list-disc list-inside text-gray-300 mb-4">
        <li>Raspberry Pi</li>
        <li>Python</li>
        <li>MQTT</li>
        <li>Node-RED</li>
      </ul>
      <p class="mb-4">A hands-on exploration of IoT and embedded systems, focusing on practical applications for daily life.</p>
    `,
    image: "/placeholder.svg?height=400&width=800&text=Smart+Home+Automation+Detail",
    githubLink: "#",
    liveDemoLink: "#",
  },
  "hackathon-project-5": {
    title: "Sentiment Analysis API",
    description: `
      <p class="mb-4">Built a RESTful API for real-time sentiment analysis of text data using Natural Language Processing (NLP) techniques. This API can be integrated into various applications to gauge public opinion or user feedback.</p>
      <p class="mb-4">The project involved training a machine learning model on a large dataset of text with sentiment labels, and then exposing its functionality through a clean and efficient API endpoint.</p>
      <h3 class="text-2xl font-medium text-white mb-4 mt-8">Technologies Used:</h3>
      <ul class="list-disc list-inside text-gray-300 mb-4">
        <li>Python</li>
        <li>Flask</li>
        <li>NLTK / spaCy</li>
        <li>Scikit-learn</li>
      </ul>
      <p class="mb-4">A practical demonstration of NLP capabilities and API development for data-driven insights.</p>
    `,
    image: "/placeholder.svg?height=400&width=800&text=Sentiment+Analysis+API+Detail",
    githubLink: "#",
    liveDemoLink: "#",
  },
  "university-project-1": {
    title: "Course Management System",
    description: `
      <p class="mb-4">A full-stack web application designed for managing university courses, student enrollments, and grades. This system streamlines administrative tasks for educational institutions.</p>
      <p class="mb-4">It features separate interfaces for students, instructors, and administrators, with robust data management and reporting functionalities.</p>
      <h3 class="text-2xl font-medium text-white mb-4 mt-8">Technologies Used:</h3>
      <ul class="list-disc list-inside text-gray-300 mb-4">
        <li>Java (Spring Boot)</li>
        <li>MySQL</li>
        <li>React.js</li>
        <li>RESTful APIs</li>
      </ul>
      <p class="mb-4">This project showcases full-stack development skills, database design, and user role management.</p>
    `,
    image: "/placeholder.svg?height=400&width=800&text=Course+Management+System+Detail",
    githubLink: "#",
    liveDemoLink: "#",
  },
  "university-project-2": {
    title: "Operating System Simulator",
    description: `
      <p class="mb-4">This project involved simulating core operating system functionalities, including process scheduling, memory management, and inter-process communication. It provides a deeper understanding of OS principles.</p>
      <p class="mb-4">Implemented various scheduling algorithms (e.g., FCFS, SJF, Round Robin) and memory allocation strategies (e.g., paging, segmentation) to observe their performance characteristics.</p>
      <h3 class="text-2xl font-medium text-white mb-4 mt-8">Technologies Used:</h3>
      <ul class="list-disc list-inside text-gray-300 mb-4">
        <li>C++</li>
        <li>Data Structures & Algorithms</li>
        <li>System Programming Concepts</li>
      </ul>
      <p class="mb-4">A foundational project in computer science, demonstrating an understanding of low-level system operations.</p>
    `,
    image: "/placeholder.svg?height=400&width=800&text=OS+Simulator+Detail",
    githubLink: "#",
    liveDemoLink: "#",
  },
  "university-project-3": {
    title: "Database Design Project",
    description: `
      <p class="mb-4">Designed and implemented a comprehensive relational database for an e-commerce platform, including product catalogs, user accounts, orders, and inventory management. The project focused on robust schema design and efficient querying.</p>
      <p class="mb-4">It involved normalization, indexing, and writing complex SQL queries to support various business operations and reporting needs.</p>
      <h3 class="text-2xl font-medium text-white mb-4 mt-8">Technologies Used:</h3>
      <ul class="list-disc list-inside text-gray-300 mb-4">
        <li>SQL (Oracle SQL)</li>
        <li>Database Design Principles</li>
        <li>ERD Modeling</li>
        <li>SQL Query Optimization</li>
      </ul>
      <p class="mb-4">A strong demonstration of database management skills and data integrity principles.</p>
    `,
    image: "/placeholder.svg?height=400&width=800&text=Database+Design+Project+Detail",
    githubLink: "#",
    liveDemoLink: "#",
  },
  "realtime-data-dashboard": {
    title: "Real-time Data Dashboard",
    description: `
      <p class="mb-4">A high-performance dashboard for visualizing streaming data with interactive charts and alerts. This project provides immediate insights into dynamic datasets.</p>
      <p class="mb-4">It utilizes WebSockets for real-time data updates and a powerful charting library to render complex data visualizations, ensuring a responsive and engaging user experience.</p>
      <h3 class="text-2xl font-medium text-white mb-4 mt-8">Technologies Used:</h3>
      <ul class="list-disc list-inside text-gray-300 mb-4">
        <li>Next.js</li>
        <li>WebSockets</li>
        <li>D3.js / Chart.js</li>
        <li>Node.js (for backend data streaming)</li>
      </ul>
      <p class="mb-4">Showcases expertise in front-end data visualization and real-time communication protocols.</p>
    `,
    image: "/placeholder.svg?height=400&width=800&text=Realtime+Data+Dashboard+Detail",
    githubLink: "#",
    liveDemoLink: "#",
  },
  "passion-project-3": {
    title: "Personal Finance Tracker",
    description: `
      <p class="mb-4">A web-based application designed to help users track personal income and expenses, with budgeting features and financial insights. It aims to provide a clear overview of personal finances.</p>
      <p class="mb-4">The application includes features for categorizing transactions, setting budget limits, and generating reports to help users manage their money effectively.</p>
      <h3 class="text-2xl font-medium text-white mb-4 mt-8">Technologies Used:</h3>
      <ul class="list-disc list-inside text-gray-300 mb-4">
        <li>Next.js</li>
        <li>TypeScript</li>
        <li>Supabase (Authentication & Database)</li>
        <li>Data Analysis Libraries</li>
      </ul>
      <p class="mb-4">A practical application of full-stack development for personal productivity and financial management.</p>
    `,
    image: "/placeholder.svg?height=400&width=800&text=Personal+Finance+Tracker+Detail",
    githubLink: "#",
    liveDemoLink: "#",
  },
  "archive-project-1": {
    title: "Legacy Blog Platform",
    description: `
      <p class="mb-4">An older blogging platform built with a traditional Model-View-Controller (MVC) framework. This project represents an early exploration into web development architectures.</p>
      <p class="mb-4">It includes functionalities for creating, editing, and publishing blog posts, user comments, and basic content management.</p>
      <h3 class="text-2xl font-medium text-white mb-4 mt-8">Technologies Used:</h3>
      <ul class="list-disc list-inside text-gray-300 mb-4">
        <li>PHP</li>
        <li>Laravel</li>
        <li>MySQL</li>
        <li>HTML/CSS/JavaScript</li>
      </ul>
      <p class="mb-4">A look back at foundational web development skills and traditional framework usage.</p>
    `,
    image: "/placeholder.svg?height=400&width=800&text=Legacy+Blog+Platform+Detail",
    githubLink: "#",
    liveDemoLink: "#",
  },
  "archive-project-2": {
    title: "Simple Calculator App",
    description: `
      <p class="mb-4">A basic calculator application developed for a mobile platform. This project served as an introduction to mobile application development and UI design principles.</p>
      <p class="mb-4">It supports standard arithmetic operations and demonstrates fundamental concepts of event handling and user interface layout on mobile devices.</p>
      <h3 class="text-2xl font-medium text-white mb-4 mt-8">Technologies Used:</h3>
      <ul class="list-disc list-inside text-gray-300 mb-4">
        <li>Java</li>
        <li>Android SDK</li>
        <li>XML (for layout)</li>
      </ul>
      <p class="mb-4">An early mobile development project, highlighting basic app structure and functionality.</p>
    `,
    image: "/placeholder.svg?height=400&width=800&text=Simple+Calculator+App+Detail",
    githubLink: "#",
    liveDemoLink: "#",
  },
  "archive-project-3": {
    title: "Early Portfolio Site",
    description: `
      <p class="mb-4">My very first personal portfolio website, showcasing early web development skills. This project marks the beginning of my journey in creating online presences.</p>
      <p class="mb-4">It features static HTML pages, basic CSS styling, and simple JavaScript interactions, reflecting foundational web development knowledge.</p>
      <h3 class="text-2xl font-medium text-white mb-4 mt-8">Technologies Used:</h3>
      <ul class="list-disc list-inside text-gray-300 mb-4">
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
      </ul>
      <p class="mb-4">A nostalgic look at my initial steps into the world of web design and development.</p>
    `,
    image: "/placeholder.svg?height=400&width=800&text=Early+Portfolio+Site+Detail",
    githubLink: "#",
    liveDemoLink: "#",
  },
}
