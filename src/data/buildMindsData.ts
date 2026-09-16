import { CoursePath, Mentor, WeeklyEventSession } from '../types';

export const BRAND = {
  name: 'Build Minds',
  tagline: 'Train Minds Build Products',
  subTagline: 'Master autonomous agent engineering and agentic testing from veteran leaders who have shipped to millions.',
};

export const MENTORS: Mentor[] = [
  {
    id: 'mohammed-jameel',
    name: 'Mohammed Jameel',
    role: 'Founding Member & AI Native Engineer',
    company: 'Kernel VisionX Technologies',
    email: 'jameel.learner@gmail.com',
    location: 'Bengaluru, India',
    experience: '24+ Years Engineering & Delivery',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    bio: 'Founding Member at Kernel VisionX Technologies with over two decades of experience in software services delivery, agile product leadership, and enterprise system architectures. Ex-Senior Software Engineer at IBM (GBS) and Accenture Services.',
    careerHighlights: [
      'Founding Member, Kernel VisionX Technologies (Nov 2019 – Present)',
      'Certified AI Native Engineer (Growth School / Outskill, 2026)',
      'Ex-Senior Software Engineer at IBM (GBS) & Accenture Services (2004 – 2013)',
      'BE in Computer Science from BMS College of Engineering (First Class Honors, 2000)',
      'Expert in scaling agile software deliveries, cross-functional startup leadership, and enterprise product lifecycles'
    ],
    specialties: [
      'AI Native Engineering',
      'Software Services Delivery',
      'Agile Project Management',
      'API Integration & Scalability',
      'Python, Java & C Architectures'
    ],
    skills: ['AI Optimization', 'API Integration', 'Software Support', 'Product Development', 'Agile Leadership'],
    rating: 4.97,
    sessionsConducted: 480,
    availableSlots: ['Wed 6:00 PM IST', 'Fri 5:30 PM IST', 'Sat 11:30 AM IST'],
    whatsappNumber: '9886558433'
  },
  {
    id: 'naveed-ks',
    name: 'Naveed KS',
    role: 'Engineering & QE Leader | AI / Agentic Systems Testing',
    company: 'Ex-Group Manager QE/Engineering at interface.ai',
    email: 'naveed.ks@gmail.com',
    location: 'Bengaluru, India',
    experience: '22+ Years Building Quality-First Engineering Orgs',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    bio: 'Built interface.ai’s entire QE and automation function from zero and re-engineered it for the agentic AI era. Scaled agentic Voice, Chat & Document AI to 100+ banking customers, pioneering probabilistic evaluation of non-deterministic LLM-driven systems. Veteran engineering leader from Cisco Systems, Pivotal, HP, and Altisource.',
    careerHighlights: [
      'Group Manager, QE / Engineering at interface.ai (Nov 2022 – May 2026) — scaled agentic voice & chat bots across 100+ banks',
      'Engineered probabilistic testing frameworks shifting from pass/fail to scored lexical/semantic evaluation of LLMs',
      'Multi-provider LLM orchestration (Groq Llama 3.3, Claude Sonnet/Opus, Gemini, OpenAI)',
      'Built advanced RAG pipelines with ChromaDB, Pinecone, PyMuPDF, and confidence-based retrieval routing',
      'Sr. QA Manager at Altisource (2012 – 2022); earlier at Cisco Systems (Grade VIII), Pivotal, and Hewlett-Packard',
      'BE in Computer Science & Engineering from Bangalore University'
    ],
    specialties: [
      'Agentic Systems Testing & Evals',
      'Multi-Provider LLM Orchestration',
      'Function Calling & Tool-Use',
      'RAG & Vector Search (ChromaDB)',
      'Probabilistic Quality Frameworks'
    ],
    skills: ['Groq / Claude / Gemini', 'Agentic Testing', 'ChromaDB', 'Python/Java', 'CI/CD Pipelines', 'Streamlit'],
    rating: 4.99,
    sessionsConducted: 540,
    availableSlots: ['Tue 7:00 PM IST', 'Thu 6:30 PM IST', 'Sat 4:00 PM IST'],
    whatsappNumber: '9620335582'
  }
];

// Free Offering: Live Comprehensive Sunday Workshop (2 Sessions)
export const WEEKLY_EVENT = {
  title: 'Build Your First Agent — Live',
  subHeading: 'Free Live Agentic AI Workshop • Every Sunday',
  frequency: 'Every Sunday • 2 Live Sessions (10:00 AM – 6:00 PM IST)',
  nextDate: 'Upcoming Sunday • 10:00 AM – 6:00 PM IST',
  tagline: 'Master LLMs, Prompt Engineering, Claude Code, Cursor, and CrewAI multi-agent workflows in a free live Sunday workshop.',
  seatsRemaining: 24,
  totalRegistered: 6840,
  days: [
    {
      dayLabel: 'Session 1 — Sunday Morning',
      timeSlot: '10:00 AM – 2:15 PM IST',
      workshopName: 'Introduction to LLMs, Prompt Engineering, AI Led Coding & Building AI Agents',
      toolsUsed: 'Claude Code & Cursor',
      topics: [
        'Large Language Models (LLMs)',
        'Prompt Engineering & Structured Prompts',
        'AI-Led Coding Workflows',
        'Generative AI Workflows',
        'OpenAI APIs (GPT-4) Integration',
        'Building Intelligent AI Agents',
        'Code Generation with LLMs',
        'Real-World AI Applications'
      ],
      description:
        'A hands-on introduction to the power of Large Language Models (LLMs) and how engineers can leverage them for AI-led coding and automation. Explore how models like GPT-4 work, understand principles of prompt engineering, and learn how to guide AI to generate optimized code and intelligent responses. Integrate OpenAI APIs into your projects, automate coding workflows, and build your own AI-powered agents.',
      speaker: 'Mohammed Jameel & Naveed KS',
      speakerRole: 'AI Native Engineer & Engineering Leader'
    },
    {
      dayLabel: 'Session 2 — Sunday Afternoon',
      timeSlot: '3:00 PM – 6:00 PM IST',
      workshopName: 'Agentic AI Workflow Demo & Agentic AI Usecases',
      toolsUsed: 'CrewAI, LangChain',
      topics: [
        'Agentic AI Workflows',
        'Multi-Agent Systems',
        'CrewAI Framework',
        'AI Orchestration',
        'Task Automation with Agents',
        'Real-World Agentic AI Use Cases',
        'Integrating Agents into Business Processes'
      ],
      description:
        'Deep dive into the emerging world of Agentic AI — where autonomous AI agents collaborate to perform complex tasks and streamline workflows. Through a live demo, explore how Agentic AI systems are designed, deployed, and connected to real-world tools and APIs. Discover practical use cases across industries: from automating business operations to building intelligent assistants.',
      speaker: 'Naveed KS & Mohammed Jameel',
      speakerRole: 'Engineering & QE Leader (Ex-interface.ai)'
    }
  ],
  agenda: [
    {
      time: 'Sunday: 10:00 AM – 2:15 PM IST',
      title: 'Introduction to LLMs, Prompt Engineering, AI Led Coding & Building AI Agents',
      speaker: 'Mohammed Jameel',
      speakerRole: 'Founding Member & AI Native Engineer',
      takeaways: [
        'Hands-on prompt engineering with Claude Code & Cursor',
        'Integrating OpenAI APIs (GPT-4) and generating production code',
        'Automating developer workflows and building your first intelligent agent'
      ]
    },
    {
      time: 'Sunday: 3:00 PM – 6:00 PM IST',
      title: 'Agentic AI Workflow Demo & Agentic AI Usecases (CrewAI & LangChain)',
      speaker: 'Naveed KS',
      speakerRole: 'Engineering & QE Leader (Ex-interface.ai)',
      takeaways: [
        'Live demo of multi-agent collaboration with CrewAI & LangChain',
        'Autonomous task automation and real-world business integration',
        'Connecting agentic systems to live APIs and operational tools'
      ]
    }
  ] as WeeklyEventSession[]
};

// Paid Offering: The Agent Builder Intensive (14 Days, 6 Sprints + Basecamp + Hackathon)
export const AGENT_BUILDER_INTENSIVE = {
  title: 'The Agent Builder Intensive',
  badge: 'Flagship 14-Day Cohort • 6 Sprints',
  tagline: '14 Days, 6 Sprints: From Foundation to Production-Grade Autonomous Multi-Agent Systems',
  startDate: '21 Sep 2026',
  duration: '14 Days (6 Sprints + Python Basecamp + Hackathon) + 6 Months Mentor Access',
  format: 'Live Immersive Sprints (7:00 PM – 11:00 PM IST) + Weekend Capstone Labs + 1:1 Defenses',
  batchSize: 'Strictly Capped at 50 Fellows',
  googleFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSc7o1NEYl6bqzDSFfbrobEFkqVTWpkIQRRtZqUpXx6bh-1Bqg/viewform?embedded=true',
  directFormLink: 'https://docs.google.com/forms/d/e/1FAIpQLSc7o1NEYl6bqzDSFfbrobEFkqVTWpkIQRRtZqUpXx6bh-1Bqg/viewform',
  // Pricing Details matching user request:
  tuition: {
    launchPrice: 6000, // ₹6000 INR limited time
    industryRate: 95000, // ₹95000 INR typical competitor rate
    savingsAmount: 89000, // ₹89000 savings
    currency: 'INR',
    currencySymbol: '₹',
    couponCode: 'LAUNCH6000'
  },
  // Direct UPI Payment Details from JameelScanner.jpg
  upiPayment: {
    recipientName: 'Jameel M (jameellearner)',
    upiId: 'jameel.learner@oksbi',
    bankName: 'Kotak Mahindra Bank 1277',
    qrAltText: 'Scan with GPay, PhonePe, Paytm or any UPI app to pay ₹6000 to Jameel M',
    upiPayUrl: 'upi://pay?pa=jameel.learner@oksbi&pn=Jameel%20M&am=6000&cu=INR&tn=BuildMinds%2014-Day%20Intensive'
  },
  highlights: [
    '14 Days intensive schedule structured across 6 rigorous engineering sprints + Python Basecamp + 2-Day Hackathon',
    'Special Discounted Launch Price: ₹6,000 INR (Industry competitor programs cost close to ₹95,000)',
    'Direct payment via UPI QR code to Jameel M (Kotak Mahindra Bank / jameel.learner@oksbi)',
    'Master MCP (Model Context Protocol), LangChain, LangGraph, CrewAI, LlamaIndex, LanceDB, n8n, and HuggingFace',
    '1:1 Architectural Code Defense & Portfolio Review with Mohammed Jameel & Naveed KS'
  ]
};

// Sprints based on the official PDF schedule:
export const SPRINT_SCHEDULE = [
  {
    sprintNumber: 0,
    title: 'Sprint 0: Kick Off & Python Basecamp',
    time: '7:00 PM – 9:00 PM IST (Kick Off) + Pre-recorded Masterclass',
    topics: 'Circle Walkthrough & Installations QnA; Python basics - Foundations for AI Native Engineering',
    description:
      'Roadmap and platform walkthrough. Comprehensive Python basecamp covering core data structures, string handling, iterators, generators, exception handling, numpy & pandas for data manipulation, functions, modules, packages, file handling, and multiprocessing/threads.',
    outcomes: [
      'Refresh Python core data structures, exceptions, and file handling',
      'Hands-on experience with iterators, generators, and modular packages',
      'Practice data manipulation using NumPy and Pandas fundamentals',
      'Understand threading and multiprocessing for parallel AI processes'
    ],
    tools: ['Python', 'VS Code']
  },
  {
    sprintNumber: 1,
    title: 'Sprint 1: Building ChatGPT (Days 1–3)',
    time: '7:00 PM – 11:00 PM IST',
    topics:
      'Day 1: Prompt Engineering + Chat Completion / OpenAI Standard. Day 2: HuggingFace, Gradio, Local Models. Day 3: Build your own ChatGPT App with Gradio.',
    description:
      'How to build a ChatGPT app. Advanced prompt engineering with XML & JSON structures. User prompt guardrails. Landscape of AI models. HuggingFace platform with free models. Running models locally on your machine. Building multi-model chat apps with ChatGPT, Gemini, and Claude simultaneously.',
    outcomes: [
      'Build advanced conversational applications using multi-provider LLM APIs',
      'Apply state-of-the-art prompt engineering (XML/JSON structures)',
      'Utilize HuggingFace and Gradio to deploy effective chatbots',
      'Run and experiment with local AI models (Ollama, LM Studio)'
    ],
    tools: ['OpenAI', 'Groq', 'LM Studio', 'Ollama', 'OpenRouter', 'Gradio']
  },
  {
    sprintNumber: 2,
    title: 'Sprint 2: Automation with AI (Days 4–5)',
    time: '7:00 PM – 11:00 PM IST',
    topics: 'Day 4: n8n Fundamentals. Day 5: Build App with n8n + Google AI Studio.',
    description:
      'Fundamentals of workflow automation using n8n: triggers, nodes, visual canvas, HTTP requests, data transformation, authentication, and scheduling. Building a full-stack application with n8n as the backend workflow engine and Google AI Studio as the frontend interface.',
    outcomes: [
      'Build and automate end-to-end workflows in n8n using triggers and multi-step logic',
      'Automate repetitive tasks like notifications, data collection, and job workflows',
      'Use core nodes (HTTP Request, Set, Code, Merge, IF, Switch) to connect external APIs',
      'Implement error handling, retries, and debugging for production workflows'
    ],
    tools: ['n8n', 'Google AI Studio']
  },
  {
    sprintNumber: 3,
    title: 'Sprint 3: Customising AI & RAG (Days 6–7)',
    time: 'Day 6: 10:00 AM – 2:00 PM & 3:00 PM – 7:00 PM | Day 7: 10:00 AM – 3:00 PM IST',
    topics:
      'Day 6 Part 1: RAG Basics + LanceDB + LlamaIndex. Day 6 Part 2: Building Atlas (Second Brain). Day 7: Build RAG App (Atlas with Extra Features).',
    description:
      'Customise AI models to answer from your data. Understand documents, images, and voice with vector databases. Build Atlas — an advanced second brain system with LlamaIndex and LanceDB that integrates Google API for YouTube data and automates assignment generation.',
    outcomes: [
      'Ability to build RAG applications from simple to end-to-end using LlamaIndex',
      'Skill in customising AI with external data (documents, images, voice) using LanceDB',
      'Integrate external APIs (Google, YouTube) to automate workflows',
      'Develop "Atlas": a production RAG second-brain system'
    ],
    tools: ['LlamaIndex', 'Gradio', 'LanceDB', 'Google APIs']
  },
  {
    sprintNumber: 4,
    title: 'Sprint 4: Open Source AI And Cost Optimization (Days 8–9)',
    time: '7:00 PM – 11:00 PM IST',
    topics: 'Day 8: Open Source with HuggingFace (Multimodal). Day 9: Cost Optimization.',
    description:
      'Multimodal AI: understanding audio & videos, generating images and speech with AI pipelines. Optimizing models for production. Measuring and predicting AI token costs, setting up budgets, and reducing inference costs.',
    outcomes: [
      'Deploy AI solutions capable of understanding and generating images, audio, and text',
      'Leverage HuggingFace pipelines for complex multimodal challenges',
      'Optimize model performance for production environments balancing cost & latency',
      'Understand budgeting, token measuring, and predicting the true cost of AI'
    ],
    tools: ['Transformers', 'Diffusers', 'Tiktoken', 'Gemini SDK', 'Anthropic SDK', 'Langfuse']
  },
  {
    sprintNumber: 5,
    title: 'Sprint 5: AI Agents & MCP (Days 10–11)',
    time: '7:00 PM – 11:00 PM IST',
    topics: 'Day 10: MCP + AI-Led Coding. Day 11: LangChain + LangSmith.',
    description:
      'How AI becomes an Agent: decisions, actions, and tool use on your computer/servers. Code-generating agents. Model Context Protocol (MCP): giving AI access to anything and building your own MCP server. Parsing structured JSON outputs with LangChain and monitoring runs with LangSmith.',
    outcomes: [
      'Build functional AI agents that execute real-world tasks using tools and code',
      'Apply Model Context Protocol (MCP) to extend agent capabilities across platforms',
      'Create and monitor agent workflows using LangChain and LangSmith',
      'Enable AI solutions to automate decisions and actions on servers and cloud'
    ],
    tools: ['Claude', 'Cursor', 'Smithery / Composio', 'LangChain', 'LangSmith']
  },
  {
    sprintNumber: 6,
    title: 'Sprint 6: Advanced AI Agents (Days 12–13)',
    time: 'Day 12: 7:00 PM – 11:00 PM | Day 13: 10:00 AM – 2:00 PM IST',
    topics: 'Day 12: LangGraph (Stateful Swarms & Memory). Day 13: Building Orion (AI Engineering Agent).',
    description:
      'Giving memory to AI agents and solving complex problems with graphs of multiple agents. Multi-agent swarms for enterprise scale. Building "Orion": an autonomous AI Engineering agent and Discord bot that makes project changes and raises pull requests in parallel using OpenAI Codex.',
    outcomes: [
      'Design multi-agent systems with advanced memory and orchestration using LangGraph',
      'Build and deploy engineering agents capable of operating autonomously on real projects',
      'Integrate AI agents into enterprise environments to solve multi-step problems',
      'Create automation bots that interact with software, manage projects, and submit PRs'
    ],
    tools: ['LangChain', 'LangGraph', 'LangSmith', 'Composio', 'OpenAI Codex']
  },
  {
    sprintNumber: 7,
    title: 'Hackathon: Production Capstone (Days 13–14)',
    time: 'Days 13 & 14 Immersive Capstone & Defense',
    topics: 'Hackathon: Secure, Deploy, and Optimize AI Systems in Production',
    description:
      'Chain complex agents, ensuring scalability, security, and cost-efficiency. Compete, build, and deploy your capstone project before Mohammed Jameel & Naveed KS.',
    outcomes: [
      'Apply all acquired skills to design, build, and ship original AI tools',
      'Tackle open-ended, real-world engineering challenges',
      'Collaborate, present, and compete in a supportive fast-paced hackathon',
      'Graduate with a verified portfolio-ready AI engineering capstone'
    ],
    tools: ['Full AI Engineer Tech Stack', 'LangGraph', 'CrewAI', 'MCP', 'Gradio']
  }
];

// Adapt COURSE_PATHS to represent the 14-day 6-sprint program with actual details
export const COURSE_PATHS: CoursePath[] = [
  {
    id: 'agentic-engineers',
    title: 'Autonomous Agent Engineering Track',
    badge: '14 Days • 6 Sprints + Hackathon',
    tagline: 'Master ChatGPT Apps, n8n Workflows, RAG Second Brains, MCP Protocol, LangGraph & Autonomous Engineering Agents.',
    targetRole: 'Software Engineers, Full-Stack Devs, Backend Leads, Tech Enthusiasts',
    prerequisites: 'Basic familiarity with Python or programming logic (Basecamp included)',
    duration: '14 Days (6 Sprints + Hackathon)',
    description:
      'The comprehensive 14-day program covering everything from prompt engineering and local models to n8n automations, vector RAG (Atlas), Model Context Protocols (MCP), LangGraph multi-agent swarms, and your capstone hackathon project.',
    tools: ['Claude', 'Cursor', 'LangGraph', 'CrewAI', 'n8n', 'LlamaIndex', 'LanceDB', 'HuggingFace', 'MCP'],
    outcomes: [
      'Build ChatGPT-grade conversational apps and run local models with Ollama & Gradio',
      'Automate enterprise workflows with full-stack n8n and Google AI Studio pipelines',
      'Create "Atlas": a production RAG second brain with LanceDB and LlamaIndex',
      'Implement Model Context Protocols (MCP) and stateful multi-agent graphs with LangGraph',
      'Build "Orion": an autonomous AI engineer that executes code and submits PRs',
      'Graduate from the capstone Hackathon with a portfolio-ready deployed agent system'
    ],
    modules: SPRINT_SCHEDULE.map((sprint) => ({
      id: `sprint-${sprint.sprintNumber}`,
      week: sprint.sprintNumber,
      title: sprint.title,
      summary: sprint.description,
      skills: sprint.tools,
      projectTitle: sprint.title.split(':')[1]?.trim() || sprint.title,
      projectDescription: sprint.topics,
      lessons: sprint.outcomes.map((outcome, idx) => ({
        id: `s-${sprint.sprintNumber}-${idx}`,
        title: outcome,
        duration: 'Live Session',
        type: (idx === 0 ? 'live' : 'workshop') as 'live' | 'workshop',
        description: `Hands-on practical training during ${sprint.title}`
      }))
    }))
  },
  {
    id: 'agentic-products',
    title: 'Agentic Product & Automation Track',
    badge: '14 Days • 6 Sprints + Hackathon',
    tagline: 'Leverage n8n automation, multi-agent CrewAI workflows, and MCP systems to build high-ROI enterprise AI products.',
    targetRole: 'Product Managers, Tech Founders, Automation Leads, Solutions Architects',
    prerequisites: 'Comfortable with software concepts and product workflows',
    duration: '14 Days (6 Sprints + Hackathon)',
    description:
      'Focus on high-value business applications: connecting multi-agent systems to business processes, building visual n8n automations, measuring token unit economics, and deploying MCP-powered assistants.',
    tools: ['n8n', 'Google AI Studio', 'CrewAI', 'Cursor', 'LangSmith', 'MCP'],
    outcomes: [
      'Design and deploy multi-agent business automation workflows using CrewAI & n8n',
      'Understand token budgeting and optimize AI operational costs for maximum ROI',
      'Leverage Model Context Protocols to connect AI agents securely to enterprise tools',
      'Create custom knowledge RAG systems for documents, audio, and video data',
      'Launch a working agentic MVP during the 2-day production hackathon'
    ],
    modules: SPRINT_SCHEDULE.filter((s) => s.sprintNumber !== 0).map((sprint) => ({
      id: `prod-sprint-${sprint.sprintNumber}`,
      week: sprint.sprintNumber,
      title: sprint.title,
      summary: sprint.description,
      skills: sprint.tools,
      projectTitle: `Business Application: ${sprint.title.split(':')[1]?.trim() || sprint.title}`,
      projectDescription: sprint.topics,
      lessons: sprint.outcomes.slice(0, 2).map((outcome, idx) => ({
        id: `p-${sprint.sprintNumber}-${idx}`,
        title: outcome,
        duration: 'Live Sprint',
        type: 'workshop' as 'workshop',
        description: `Enterprise application focus for ${sprint.title}`
      }))
    }))
  }
];
