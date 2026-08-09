/* ==========================================
   PORTFOLIO DASHBOARD — DATA MODULE
   ========================================== */

const PORTFOLIO_DATA = {
  profile: {
    name: "Kartik Kohad",
    role: "Aspiring ML Engineer & Data Analyst",
    monoTag: "<B.Tech Engineering Student />",
    status: "Open to opportunities",
    location: "India",
    tagline: "Building end-to-end pipelines that go from raw data to a trained model to a real, usable product.",
    email: "kartikkohad16@gmail.com",
    github: "https://github.com/Kartik-hub16",
    linkedin: "https://www.linkedin.com/in/kartik-kohad-885505325",
    bio: "I'm a Computer Science student focused on machine learning engineering and data analysis — building end-to-end pipelines that go from raw data to a trained model to a real, usable product. Recent projects span resume parsing/NLP, security threat detection, and full-stack AI platforms like TalentIQ."
  },

  metrics: [
    { label: "Projects Shipped", value: "5 Major", trend: "Production & Open-Source", icon: "box" },
    { label: "Certifications", value: "6 Verified", trend: "IBM, UPenn & More", icon: "award" },
    { label: "Years Experience", value: "2+", trend: "Active", icon: "clock" },
    { label: "Availability Status", value: "Open to Work", trend: "Full-Time / Remote", icon: "zap" }
  ],

  techStack: [
    {
      category: "Languages",
      count: "4 Skills",
      items: [
        { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
        { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
        { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
        { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azuresqldatabase/azuresqldatabase-original.svg" }
      ]
    },
    {
      category: "Frontend & Fullstack",
      count: "6 Skills",
      items: [
        { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
        { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
        { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
        { name: "React 19", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { name: "Vite", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vite/vite-original.svg" },
        { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" }
      ]
    },
    {
      category: "Backend, Database & DevOps",
      count: "8 Skills",
      items: [
        { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
        { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
        { name: "Django REST", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
        { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
        { name: "SQLite", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg" },
        { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
        { name: "Nginx", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" },
        { name: "REST APIs", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" }
      ]
    },
    {
      category: "AI/ML, Data Science & LLMs",
      count: "10 Skills",
      items: [
        { name: "Gemini AI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" },
        { name: "Groq (Llama 3.3)", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
        { name: "Pandas", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
        { name: "NumPy", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
        { name: "Scikit-Learn", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg" },
        { name: "Streamlit", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/streamlit/streamlit-original.svg" },
        { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
        { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
        { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" }
      ]
    }
  ],

  projects: [
    {
      id: "cyber-threat-detection",
      name: "Cyber Threat Detection System",
      category: "security",
      problem: "Most security tools check one threat type at a time. This provides a unified engine to analyze files, URLs, phone numbers, logs, and passwords before trusting them.",
      stack: ["Python", "Streamlit", "SQLite", "Pandas"],
      status: "Live",
      statusClass: "live",
      github: "https://github.com/Kartik-hub16/Cyber_Threat_Detection_System",
      demo: "https://github.com/Kartik-hub16/Cyber_Threat_Detection_System",
      features: [
        "File integrity & malware scan (MD5/SHA1/SHA256 cryptographic hashing)",
        "URL phishing-heuristics engine with CVSS-style severity scoring",
        "Phone number validation & spam probability scoring",
        "Log analysis for brute-force attack vectors & anomaly patterns",
        "Password entropy calculation engine with action feedback",
        "Real-time threat stats dashboard with relational audit tracking"
      ],
      learned: "Building a multi-module security pipeline, applying cryptographic hashing for file integrity checks, calculating heuristic/CVSS-style risk metrics, and designing relational SQLite schemas for unified threat tracking.",
      metrics: "Multi-vector threat scoring · Sub-50ms audit pipeline"
    },
    {
      id: "portfolio-generator",
      name: "Professional Portfolio Generator",
      category: "ai-llm",
      problem: "Building a portfolio from scratch is slow and inconsistent — creators fight rigid static templates or spend hours writing and styling content.",
      stack: ["HTML5", "CSS3", "JavaScript", "Node.js", "Express", "Groq API (Llama 3.3)", "html2pdf.js"],
      status: "Live",
      statusClass: "live",
      github: "https://github.com/Kartik-hub16/Professional_Portfolio_Generator",
      demo: "https://github.com/Kartik-hub16/Professional_Portfolio_Generator",
      features: [
        "Two-step intake flow: basic profile info → detailed form",
        "AI-generated professional bio & project copy powered by Groq (Llama 3.3)",
        "Instant live portfolio preview engine",
        "One-click client-side PDF export via html2pdf.js",
        "Photo upload, social link bindings, and responsive dark theme preset"
      ],
      learned: "Implementing multi-page intake state handoff using Browser Storage (sessionStorage/localStorage), executing server-side LLM completion prompts with Groq API, and rendering high-fidelity HTML-to-PDF exports.",
      metrics: "Sub-2s LLM generation speed · Client-side PDF rendering"
    },
    {
      id: "talent-iq-platform",
      name: "TalentIQ — AI Career Intelligence Platform",
      category: "ai-llm",
      problem: "Job seekers need to know fast whether their resume will clear ATS and land with a recruiter — and building a portfolio from that resume is extra friction. TalentIQ merges parsing, ATS scoring, and portfolio generation into one platform.",
      stack: ["Django REST", "Python 3.13+", "React 19", "Vite", "PostgreSQL", "Gemini AI", "Docker", "Nginx"],
      status: "Live",
      statusClass: "live",
      github: "https://github.com/KRISHNARAJSINH0/TalentIQ",
      demo: "https://talent-iq-snowy.vercel.app",
      features: [
        "AI-powered resume parsing engine powered by Gemini AI",
        "ATS scoring & keyword optimization recommendations",
        "Automated Web Portfolio Builder generated from parsed resume data",
        "Dashboard analytics, JWT auth & Admin Intelligence Dashboard",
        "Real-time notification platform across 17 delivery phases roadmap",
        "Containerized orchestration with Docker Compose & Nginx reverse proxy"
      ],
      learned: "Architecting a full-stack SaaS app through a 17-phase delivery roadmap, integrating Gemini AI for resume parsing, structuring a scalable Django app across separate services (accounts, resumes, parser, portfolio, ats), and containerized deployment with Docker Compose + Nginx.",
      metrics: "17-Phase Delivery Roadmap · Gemini AI + Django REST + React 19"
    },
    {
      id: "resume-builder-spinoff",
      name: "Resume Builder (TalentIQ Spinoff)",
      category: "ai-llm",
      problem: "A focused, standalone slice of TalentIQ's resume-building flow — generate and share a resume without the full platform.",
      stack: ["Python", "Django", "React", "ML Module", "Docker", "Vercel"],
      status: "Live",
      statusClass: "live",
      github: "https://github.com/KRISHNARAJSINH0/Resume_builder_from_TalentIQ",
      demo: "https://resume-builder-from-talent-iq.vercel.app",
      features: [
        "AI-assisted resume generation and instant shareable output",
        "Dedicated Machine Learning module operating alongside Django backend",
        "Containerized setup with Docker for cloud deployment on Vercel"
      ],
      learned: "Decoupling a focused feature into a standalone microservice, structuring a dedicated ML module alongside a Django backend, and containerizing with Docker for Vercel deployment.",
      metrics: "Standalone SaaS Spinoff · Docker & Vercel"
    },
    {
      id: "cybershield-ai",
      name: "CyberShield AI",
      category: "security",
      problem: "Standard SOC dashboards are either expensive enterprise tools or single-purpose scripts. CyberShield AI is a portfolio-scale SOC platform bringing 20 security modules — phishing detection, supply chain scanning, login anomaly/UEBA, malware analysis, real-time threat intel, deepfake detection, and more — into one console.",
      stack: ["FastAPI", "Python", "React", "Vite", "Tailwind CSS"],
      status: "In Progress",
      statusClass: "in-progress",
      github: "https://github.com/Kartik-hub16/CyberShield-AI",
      demo: "https://github.com/Kartik-hub16/CyberShield-AI",
      features: [
        "6 flagship modules upgraded to real trained ML models & live threat-intel APIs (phishing classifier, supply chain scanner, malware/IP reputation, UEBA login anomaly, HIBP breach check, deepfake audio detection)",
        "Remaining modules operating as transparent heuristic engines for audit accuracy",
        "Unified portfolio-scale Security Operations Center (SOC) dashboard console",
        "FastAPI high-concurrency backend API with asynchronous threat scanners"
      ],
      learned: "Transitioning mocked demo-data prototypes to real trained ML models and live threat-intel API integrations, while explicitly distinguishing between ML-backed modules vs heuristic engines.",
      metrics: "20 SOC Security Modules · Real Trained ML Models"
    }
  ],

  timeline: [
    {
      period: "2023 - Present",
      role: "B.Tech Engineering Student & AI Developer",
      institution: "Engineering Institute",
      details: "Focusing on Artificial Intelligence, Data Science, Data Structures & Algorithms, Database Management Systems, and Distributed SaaS Systems."
    },
    {
      period: "2024 - 2025",
      role: "Core Fullstack & AI Lead",
      institution: "TalentIQ & Open-Source Security Projects",
      details: "Co-architected TalentIQ (AI Career Intelligence Platform), built the Cyber Threat Detection System, and created the Groq-powered Professional Portfolio Generator."
    },
    {
      period: "2023 - 2024",
      role: "Data Science & Python Developer",
      institution: "Independent Research & Projects",
      details: "Developed algorithmic security parsers, cryptographic hash checking tools, and statistical data analysis scripts using Python, Pandas, and SQLite."
    }
  ],

  learningNow: [
    {
      upper: "AUTONOMOUS AGENTS",
      label: "Agentic AI & LangChain",
      iconName: "bot"
    },
    {
      upper: "FRONTIER MODELS",
      label: "LLMs & RAG Architectures",
      iconName: "sparkles"
    },
    {
      upper: "CONTAINERIZATION",
      label: "Docker & Container Orchestration",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"
    },
    {
      upper: "CLOUD INFRASTRUCTURE",
      label: "AWS & Production Cloud",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg"
    },
    {
      upper: "ADVANCED ALGORITHMS",
      label: "DSA & System Optimization",
      iconName: "code"
    },
    {
      upper: "CLOUD HOSTING",
      label: "Render & Vercel PaaS",
      iconName: "server"
    },
    {
      upper: "AI SYSTEM DESIGN",
      label: "Generative AI Engineering",
      iconName: "cpu"
    },
    {
      upper: "DATA PIPELINES",
      label: "PostgreSQL & Vector Databases",
      iconName: "database"
    }
  ],

  certificates: [
    {
      title: "Exploratory Data Analysis for Machine Learning",
      issuer: "IBM (Coursera)",
      date: "Completed May 30, 2026",
      verifyUrl: "https://coursera.org/verify/032EF9DGS8KJ"
    },
    {
      title: "Introduction to HTML, CSS, & JavaScript",
      issuer: "IBM (Coursera)",
      date: "Completed Dec 22, 2025",
      verifyUrl: "https://coursera.org/verify/RKYIQDSL42VN"
    },
    {
      title: "Inheritance and Data Structures in Java",
      issuer: "University of Pennsylvania (Coursera)",
      date: "Completed Jul 18, 2025",
      verifyUrl: "https://coursera.org/verify/AXJDHSC0WS4J"
    },
    {
      title: "Introduction to Java",
      issuer: "LearnQuest (Coursera)",
      date: "Completed Jan 16, 2025",
      verifyUrl: "https://coursera.org/verify/R6NO2VYVZPEF"
    },
    {
      title: "Python Using AI Workshop",
      issuer: "AI For Techies",
      date: "Issued Jun 1, 2025",
      verifyUrl: "AI_Workshop.pdf"
    },
    {
      title: "Generative AI Mastermind",
      issuer: "Outskill",
      date: "Completed",
      verifyUrl: "Generative_AI_Certification.pdf"
    }
  ]
};
