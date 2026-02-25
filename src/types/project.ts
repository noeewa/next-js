export interface Project {
  id: string
  name: string
  description: string
  status: "active" | "draft" | "inactive"
  aiProvider: "groq" | "openai" | "cerebras"
  aiName: string
  welcomeMessage: string
  primaryColor: string
  position: "bottom-right" | "bottom-left" | "top-right" | "top-left"
  theme: "light" | "dark"
  createdAt: string
  updatedAt: string
  stats: {
    messages: number
    users: number
    avgResponseTime: string
    satisfaction: number
  }
}

export interface ChatSession {
  id: string
  user: string
  lastMessage: string
  time: string
}

export interface Document {
  id: string
  name: string
  size: string
  chunks: number
  status: "ready" | "processing"
  createdAt: string
}

export interface PricingPlan {
  id: string
  name: string
  price: number
  period: string
  features: string[]
  popular?: boolean
}
