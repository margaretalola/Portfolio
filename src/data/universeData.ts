export interface RoomObject {
  id: string
  type: "sofa" | "tv" | "vase" | "coffeeTable" | "rug" | "bookshelf" | "lamp" | "plant" | "frame" | "desk" | "chair" | "clock" | "window" | "door" | "cabinet"
  position: [number, number, number]
  rotation?: [number, number, number]
  label: string
  description: string
  color: string
  accentColor?: string
}

export interface WorldLocation {
  id: string
  name: string
  icon: string
  position: [number, number, number]
  description: string
  items: string[]
  color: string
  glowColor: string
  roomObjects?: RoomObject[]
}

export interface Decoration {
  type: "tree" | "bush" | "rock" | "flower" | "crystal" | "lamp" | "fountain" | "portal"
  position: [number, number, number]
  scale: number
}

export interface Pathway {
  from: [number, number, number]
  to: [number, number, number]
}

export const worldLocations: WorldLocation[] = [
  {
    id: "centerPlaza",
    name: "Center Plaza",
    icon: "⛲",
    position: [0, 0, 0],
    description: "The heart of the universe — a fountain with a floating orb. Explore the buildings around.",
    items: ["Projects", "Experience", "Skills", "About", "Certifications", "Contact"],
    color: "#06b6d4",
    glowColor: "#22d3ee",
  },
  {
    id: "projects",
    name: "Projects",
    icon: "🏢",
    position: [-12, 0, -12],
    description: "Explore my project showcase — Customer Retention, Dental Health, BI Dashboard, and more.",
    items: ["Customer Retention", "Dashboard", "System Architecture"],
    color: "#10b981",
    glowColor: "#34d399",
    roomObjects: [
      {
        id: "proj-laptop",
        type: "desk",
        position: [-3, 0, -2],
        label: "💻 Customer Retention",
        description: "Machine learning model for predicting customer churn using XGBoost. Achieved 85% accuracy.",
        color: "#34d399",
      },
      {
        id: "proj-tv",
        type: "tv",
        position: [3, 0, -2],
        label: "📺 BI Dashboard",
        description: "Interactive Business Intelligence dashboard built with Looker for real-time KPI monitoring.",
        color: "#8b5cf6",
      },
      {
        id: "proj-monitor",
        type: "frame",
        position: [0, 0, 2],
        label: "🖥️ Network Disruption",
        description: "Real-time network monitoring system with Prometheus and Grafana for disruption detection.",
        color: "#f59e0b",
      },
    ],
  },
  {
    id: "experience",
    name: "Experience",
    icon: "💼",
    position: [12, 0, -12],
    description: "My professional journey — from intern to engineer in data analytics and system operations.",
    items: ["Lintasarta", "Laskar AI", "Ivosights", "Lab Assistant"],
    color: "#6366f1",
    glowColor: "#818cf8",
    roomObjects: [
      {
        id: "exp-desk",
        type: "desk",
        position: [0, 0, 0],
        label: "📋 Professional Experience",
        description: "Operation Support Engineer at PT Aplikanusa Lintasarta. Managing network operations and system support.",
        color: "#6366f1",
      },
      {
        id: "exp-bookshelf",
        type: "bookshelf",
        position: [0, 0, 0],
        label: "🎓 Education & Internships",
        description: "Background in Informatics Engineering with internships at Ivosights and Laskar AI.",
        color: "#f59e0b",
      },
    ],
  },
  {
    id: "skills",
    name: "Skills",
    icon: "⚡",
    position: [-12, 0, 12],
    description: "Technical skills across data analytics, machine learning, system development, and more.",
    items: ["Data Analytics", "ML", "System Dev", "Frontend", "DevOps", "Design"],
    color: "#f59e0b",
    glowColor: "#fbbf24",
  },
  {
    id: "about",
    name: "About",
    icon: "👤",
    position: [12, 0, 12],
    description: "Learn more about who I am, my background, and my approach to data and technology.",
    items: ["Bio", "Approach", "Values"],
    color: "#ec4899",
    glowColor: "#f472b6",
    roomObjects: [
      {
        id: "about-bio",
        type: "frame",
        position: [0, 0, 0],
        label: "📖 Bio",
        description: "Data Analyst & Business Intelligence professional with a passion for turning data into business decisions.",
        color: "#ec4899",
      },
      {
        id: "about-bookshelf",
        type: "bookshelf",
        position: [0, 0, 0],
        label: "📚 Knowledge",
        description: "Informatics Engineering graduate with certifications in Data Science, Agile, Excel, and UX Design.",
        color: "#38bdf8",
      },
    ],
  },
  {
    id: "certifications",
    name: "Certifications",
    icon: "🏅",
    position: [0, 0, -16],
    description: "Professional certifications in data science, agile, and design.",
    items: ["BNSP Data Scientist", "Agile Scrum", "Excel Associate", "Google UX"],
    color: "#8b5cf6",
    glowColor: "#a78bfa",
  },
  {
    id: "contact",
    name: "Contact",
    icon: "📮",
    position: [0, 0, 16],
    description: "Get in touch — I'm open to full-time and freelance opportunities.",
    items: ["Email", "LinkedIn", "GitHub", "Resume"],
    color: "#ef4444",
    glowColor: "#f87171",
  },
]

export const decorations: Decoration[] = [
  { type: "tree", position: [-20, 0, -20], scale: 1.5 },
  { type: "tree", position: [20, 0, -20], scale: 1.6 },
  { type: "tree", position: [-20, 0, 20], scale: 1.3 },
  { type: "tree", position: [20, 0, 20], scale: 1.4 },
  { type: "tree", position: [-18, 0, 0], scale: 1.1 },
  { type: "tree", position: [18, 0, 0], scale: 1.0 },
  { type: "tree", position: [-6, 0, 18], scale: 0.9 },
  { type: "tree", position: [6, 0, -18], scale: 1.2 },
  { type: "tree", position: [-15, 0, 8], scale: 1.3 },
  { type: "tree", position: [15, 0, -8], scale: 1.1 },
  { type: "tree", position: [8, 0, 15], scale: 1.0 },
  { type: "tree", position: [-8, 0, -15], scale: 1.2 },
  { type: "bush", position: [-8, 0, -8], scale: 0.7 },
  { type: "bush", position: [8, 0, -8], scale: 0.8 },
  { type: "bush", position: [-8, 0, 8], scale: 0.6 },
  { type: "bush", position: [8, 0, 8], scale: 0.7 },
  { type: "bush", position: [-16, 0, -8], scale: 0.6 },
  { type: "bush", position: [16, 0, 8], scale: 0.6 },
  { type: "bush", position: [-4, 0, -16], scale: 0.5 },
  { type: "bush", position: [4, 0, 16], scale: 0.5 },
  { type: "rock", position: [-14, 0, -4], scale: 0.5 },
  { type: "rock", position: [14, 0, 4], scale: 0.6 },
  { type: "rock", position: [-4, 0, 14], scale: 0.4 },
  { type: "rock", position: [4, 0, -14], scale: 0.5 },
  { type: "rock", position: [10, 0, -10], scale: 0.4 },
  { type: "rock", position: [-10, 0, 10], scale: 0.3 },
  { type: "flower", position: [-10, 0, 0], scale: 0.35 },
  { type: "flower", position: [10, 0, 0], scale: 0.35 },
  { type: "flower", position: [0, 0, 10], scale: 0.35 },
  { type: "flower", position: [0, 0, -10], scale: 0.35 },
  { type: "flower", position: [-16, 0, -14], scale: 0.3 },
  { type: "flower", position: [16, 0, -14], scale: 0.3 },
  { type: "flower", position: [-16, 0, 14], scale: 0.3 },
  { type: "flower", position: [16, 0, 14], scale: 0.3 },
  { type: "flower", position: [-6, 0, -12], scale: 0.25 },
  { type: "flower", position: [6, 0, 12], scale: 0.25 },
  { type: "crystal", position: [-5, 0, -16], scale: 0.6 },
  { type: "crystal", position: [5, 0, 16], scale: 0.7 },
  { type: "crystal", position: [-16, 0, -10], scale: 0.5 },
  { type: "crystal", position: [16, 0, 10], scale: 0.6 },
  { type: "crystal", position: [10, 0, 6], scale: 0.4 },
  { type: "lamp", position: [-3, 0, -3], scale: 0.7 },
  { type: "lamp", position: [3, 0, -3], scale: 0.7 },
  { type: "lamp", position: [-3, 0, 3], scale: 0.7 },
  { type: "lamp", position: [3, 0, 3], scale: 0.7 },
  { type: "lamp", position: [-10, 0, -6], scale: 0.6 },
  { type: "lamp", position: [10, 0, 6], scale: 0.6 },
  { type: "portal", position: [-12, 0, -8], scale: 0.6 },
  { type: "portal", position: [12, 0, -8], scale: 0.6 },
  { type: "portal", position: [-12, 0, 8], scale: 0.6 },
  { type: "portal", position: [12, 0, 8], scale: 0.6 },
  { type: "portal", position: [0, 0, -12], scale: 0.6 },
  { type: "portal", position: [0, 0, 12], scale: 0.6 },
  { type: "fountain", position: [0, 0, 0], scale: 1 },
]

export const pathways: Pathway[] = [
  { from: [0, 0, 0], to: [-12, 0, -12] },
  { from: [0, 0, 0], to: [12, 0, -12] },
  { from: [0, 0, 0], to: [-12, 0, 12] },
  { from: [0, 0, 0], to: [12, 0, 12] },
  { from: [0, 0, 0], to: [0, 0, -16] },
  { from: [0, 0, 0], to: [0, 0, 16] },
  { from: [-12, 0, -12], to: [0, 0, -16] },
  { from: [12, 0, -12], to: [0, 0, -16] },
]

export const playerStart: [number, number, number] = [0, 1, 10]

export const PROXIMITY_THRESHOLD = 5
