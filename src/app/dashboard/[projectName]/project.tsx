"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  ArrowLeft, 
  Bot, 
  Settings, 
  MessageSquare, 
  FileText, 
  Code, 
  BarChart3,
  Users,
  Copy,
  ExternalLink,
  Play,
  Pause,
  Trash2,
  Edit,
  CheckCircle2,
  AlertCircle,
  Clock,
  TrendingUp,
  Activity,
  Globe
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

// Mock project data
const project = {
  id: "1",
  name: "Customer Service Bot",
  description: "Chatbot untuk layanan pelanggan e-commerce",
  status: "active",
  aiProvider: "groq",
  aiName: "Assistant",
  welcomeMessage: "Halo! Ada yang bisa saya bantu?",
  primaryColor: "#3b82f6",
  position: "bottom-right",
  theme: "light",
  createdAt: "2024-01-15",
  updatedAt: "2024-02-20",
  stats: {
    messages: 1247,
    users: 89,
    avgResponseTime: "1.2s",
    satisfaction: 94.5
  }
}

// Mock chat sessions
const recentChats = [
  { id: "1", user: "Ahmad", lastMessage: "Bagaimana cara melacak pesanan?", time: "2 menit lalu" },
  { id: "2", user: "Siti", lastMessage: "Saya ingin mengembalikan produk", time: "5 menit lalu" },
  { id: "3", user: "Budi", lastMessage: "Terima kasih atas informasinya", time: "10 menit lalu" },
  { id: "4", user: "Rina", lastMessage: "Kapan pesanan saya tiba?", time: "15 menit lalu" },
  { id: "5", user: "Doni", lastMessage: "Apa kebijakan pengembalian?", time: "20 menit lalu" },
]

// Mock knowledge base documents
const documents = [
  { id: "1", name: "FAQ Products.pdf", size: "2.4 MB", chunks: 45, status: "ready", createdAt: "2024-02-15" },
  { id: "2", name: "Shipping Policy.docx", size: "156 KB", chunks: 12, status: "ready", createdAt: "2024-02-10" },
  { id: "3", name: "Return Policy.pdf", size: "890 KB", chunks: 28, status: "processing", createdAt: "2024-02-20" },
]

const statusConfig = {
  active: { label: "Aktif", color: "bg-green-500", textColor: "text-green-600", bgColor: "bg-green-50 dark:bg-green-950" },
  pending: { label: "Menunggu", color: "bg-yellow-500", textColor: "text-yellow-600", bgColor: "bg-yellow-50 dark:bg-yellow-950" },
  inactive: { label: "Nonaktif", color: "bg-gray-500", textColor: "text-gray-600", bgColor: "bg-gray-50 dark:bg-gray-950" },
}

export default function ProjectDetailPage({ params }: { params: { projectName: string } }) {
  const [isActive, setIsActive] = useState(project.status === "active")
  const [widgetCode] = useState(`<script src="https://cdn.example.com/widget.js" data-project-id="${project.id}"></script>`)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Pesan</CardTitle>
            <MessageSquare className="h-4 w-4 text-primary opacity-60" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{project.stats.messages.toLocaleString()}</div>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +12% dari bulan lalu
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pengguna Aktif</CardTitle>
            <Users className="h-4 w-4 text-primary opacity-60" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{project.stats.users}</div>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +8% dari bulan lalu
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Waktu Respons</CardTitle>
            <Clock className="h-4 w-4 text-primary opacity-60" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{project.stats.avgResponseTime}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Rata-rata cepat
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Kepuasan</CardTitle>
            <Activity className="h-4 w-4 text-primary opacity-60" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{project.stats.satisfaction}%</div>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +2.3% dari bulan lalu
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="chat">Chat Sessions</TabsTrigger>
          <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
          <TabsTrigger value="settings">Pengaturan</TabsTrigger>
          <TabsTrigger value="embed">Embed Code</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Informasi Proyek</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Provider AI</span>
                  <span className="font-medium">{project.aiProvider.toUpperCase()}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Nama AI</span>
                  <span className="font-medium">{project.aiName}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Warna Primer</span>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: project.primaryColor }}
                    />
                    <span className="font-medium">{project.primaryColor}</span>
                  </div>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Posisi Widget</span>
                  <span className="font-medium capitalize">{project.position.replace("-", " ")}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Tema</span>
                  <span className="font-medium capitalize">{project.theme}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pesan Pembuka</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm">{project.welcomeMessage}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Chat Sessions Tab */}
        <TabsContent value="chat" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sesi Chat Terbaru</CardTitle>
              <CardDescription>
                Riwayat percakapan dengan pengguna
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentChats.map((chat) => (
                  <div 
                    key={chat.id}
                    className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-medium">
                          {chat.user.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{chat.user}</p>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {chat.lastMessage}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{chat.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Knowledge Base Tab */}
        <TabsContent value="knowledge" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Dokumen Knowledge Base</CardTitle>
                <CardDescription>
                  Upload dokumen untuk training chatbot
                </CardDescription>
              </div>
              <Button>
                <FileText className="mr-2 h-4 w-4" />
                Upload Dokumen
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documents.map((doc) => (
                  <div 
                    key={doc.id}
                    className="flex items-center justify-between p-4 rounded-lg border"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>{doc.size}</span>
                          <span>•</span>
                          <span>{doc.chunks} chunks</span>
                          <span>•</span>
                          <span>{doc.createdAt}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {doc.status === "ready" ? (
                        <span className="flex items-center gap-1 text-xs text-green-600">
                          <CheckCircle2 className="h-3 w-3" />
                          Ready
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs text-yellow-600">
                          <AlertCircle className="h-3 w-3 animate-pulse" />
                          Processing
                        </span>
                      )}
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Chatbot</CardTitle>
              <CardDescription>
                Atur konfigurasi AI dan respons chatbot
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="aiName">Nama AI</Label>
                  <Input id="aiName" defaultValue={project.aiName} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="aiProvider">Provider AI</Label>
                  <Input id="aiProvider" defaultValue={project.aiProvider} disabled />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="welcomeMessage">Pesan Pembuka</Label>
                <Input id="welcomeMessage" defaultValue={project.welcomeMessage} />
              </div>
              <Button>Simpan Perubahan</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Embed Code Tab */}
        <TabsContent value="embed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Widget Embed Code</CardTitle>
              <CardDescription>
                Copy kode di bawah dan paste ke website Anda
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <pre className="p-4 bg-muted rounded-lg overflow-x-auto">
                  <code className="text-sm font-mono">{widgetCode}</code>
                </pre>
                <Button 
                  variant="secondary" 
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(widgetCode)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center gap-2 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <Globe className="h-5 w-5 text-blue-600" />
                <div className="text-sm">
                  <p className="font-medium text-blue-600">Widget bekerja di semua platform</p>
                  <p className="text-blue-600/70">WordPress, Shopify, Webflow, atau website custom</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Preview Widget
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
