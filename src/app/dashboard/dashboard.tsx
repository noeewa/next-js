"use client"

import Link from "next/link"
import { 
  Bot, 
  Plus, 
  MoreVertical, 
  MessageSquare, 
  Calendar, 
  Clock,
  TrendingUp,
  Users,
  Copy,
  ExternalLink,
  CheckCircle2,
  XCircle,
  AlertCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"

// Mock data for projects
const projects = [
  {
    id: "1",
    name: "Customer Service Bot",
    description: "Chatbot untuk layanan pelanggan e-commerce",
    status: "active",
    messages: 1247,
    users: 89,
    createdAt: "2024-01-15",
    updatedAt: "2024-02-20",
  },
  {
    id: "2",
    name: "FAQ Assistant",
    description: "Bot untuk menjawab pertanyaan umum",
    status: "active",
    messages: 856,
    users: 45,
    createdAt: "2024-01-20",
    updatedAt: "2024-02-18",
  },
  {
    id: "3",
    name: "Sales Bot",
    description: "Chatbot untuk proses penjualan",
    status: "pending",
    messages: 0,
    users: 0,
    createdAt: "2024-02-19",
    updatedAt: "2024-02-19",
  },
  {
    id: "4",
    name: "HR Assistant",
    description: "Bot untuk pertanyaan HR dan karyawan",
    status: "inactive",
    messages: 423,
    users: 12,
    createdAt: "2024-01-10",
    updatedAt: "2024-02-01",
  },
]

const statusConfig = {
  active: { 
    label: "Aktif", 
    color: "bg-green-500", 
    icon: CheckCircle2,
    textColor: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-950"
  },
  pending: { 
    label: "Menunggu", 
    color: "bg-yellow-500", 
    icon: AlertCircle,
    textColor: "text-yellow-600",
    bgColor: "bg-yellow-50 dark:bg-yellow-950"
  },
  inactive: { 
    label: "Nonaktif", 
    color: "bg-gray-500", 
    icon: XCircle,
    textColor: "text-gray-600",
    bgColor: "bg-gray-50 dark:bg-gray-950"
  },
  draft: { 
    label: "Draft", 
    color: "bg-blue-500", 
    icon: AlertCircle,
    textColor: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950"
  },
}

export default function DashboardPage() {
  // Calculate stats
  const totalProjects = projects.length
  const activeProjects = projects.filter(p => p.status === "active").length
  const totalMessages = projects.reduce((acc, p) => acc + p.messages, 0)
  const totalUsers = projects.reduce((acc, p) => acc + p.users, 0)

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Kelola dan monitor chatbot AI Anda
          </p>
        </div>
        <Link href="/dashboard/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Buat Proyek Baru
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Proyek
            </CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProjects}</div>
            <p className="text-xs text-muted-foreground">
              +2 bulan ini
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Proyek Aktif
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeProjects}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((activeProjects / totalProjects) * 100)}% dari total
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Pesan
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMessages.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +12% dari bulan lalu
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Pengguna
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              +8% dari bulan lalu
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Projects Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Proyek Chatbot</h2>
        
        {projects.length === 0 ? (
          <Card className="py-12">
            <CardContent className="flex flex-col items-center justify-center text-center">
              <Bot className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Belum ada proyek</h3>
              <p className="text-muted-foreground mb-4">
                Mulai membuat chatbot AI pertama Anda
              </p>
              <Link href="/dashboard/create">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Buat Proyek Baru
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => {
              const status = statusConfig[project.status as keyof typeof statusConfig]
              const StatusIcon = status.icon
              
              return (
                <Card key={project.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">
                          <Link 
                            href={`/dashboard/${project.id}`}
                            className="hover:underline"
                          >
                            {project.name}
                          </Link>
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                          {project.description}
                        </CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Lihat Detail
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="mr-2 h-4 w-4" />
                            Duplikasi
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            Hapus Proyek
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Status Badge */}
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${status.bgColor}`}>
                      <StatusIcon className={`h-4 w-4 ${status.textColor}`} />
                      <span className={`text-sm font-medium ${status.textColor}`}>
                        {status.label}
                      </span>
                    </div>
                    
                    <Separator />
                    
                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        <div className="text-sm">
                          <span className="font-medium">{project.messages}</span>
                          <span className="text-muted-foreground"> pesan</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <div className="text-sm">
                          <span className="font-medium">{project.users}</span>
                          <span className="text-muted-foreground"> pengguna</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Dates */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>Dibuat: {project.createdAt}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>Diupdate: {project.updatedAt}</span>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex gap-2">
                      <Link href={`/dashboard/${project.id}`} className="flex-1">
                        <Button variant="outline" className="w-full">
                          Kelola
                        </Button>
                      </Link>
                      <Button variant="secondary" size="icon">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
