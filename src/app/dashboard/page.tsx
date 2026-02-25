"use client"

import Link from "next/link"
import { Plus, Activity, Users, Zap, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PageHeader } from "@/components/page-header"
import { StatCard } from "@/components/stat-card"
import { EmptyState } from "@/components/empty-state"

// Mock user projects
const userProjects = [
  {
    id: "1",
    name: "Customer Service Bot",
    status: "active",
    messages: 1247,
    users: 89,
    createdAt: "15 Jan 2024"
  },
  {
    id: "2",
    name: "Sales Assistant",
    status: "active",
    messages: 856,
    users: 64,
    createdAt: "20 Jan 2024"
  },
  {
    id: "3",
    name: "FAQ Bot",
    status: "draft",
    messages: 0,
    users: 0,
    createdAt: "25 Jan 2024"
  },
]

const stats = [
  {
    label: "Total Chatbot",
    value: "3",
    icon: Zap,
    trend: "+2 bulan ini"
  },
  {
    label: "Total Pesan",
    value: "2.103",
    icon: Activity,
    trend: "+450 hari ini"
  },
  {
    label: "Total Pengguna",
    value: "153",
    icon: Users,
    trend: "+28 bulan ini"
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <PageHeader
        title="Dashboard"
        description="Kelola dan pantau semua chatbot AI Anda"
        action={
          <Link href="/dashboard/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Buat Proyek Baru
            </Button>
          </Link>
        }
      />

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            title={stat.label}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            trendPositive={true}
          />
        ))}
      </div>

      {/* Projects Section */}
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold">Proyek Terbaru</h2>
          <p className="text-muted-foreground text-sm">Akses dan kelola chatbot Anda</p>
        </div>

        {userProjects.length > 0 ? (
          <div className="grid gap-4">
            {userProjects.map((project) => (
              <Link key={project.id} href={`/dashboard/${project.id}`}>
                <Card className="cursor-pointer transition-all hover:shadow-md hover:border-primary/50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-lg truncate">{project.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Dibuat {project.createdAt}
                        </p>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-muted-foreground text-sm">
                            <Activity className="h-4 w-4 flex-shrink-0" />
                            {project.messages} pesan
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground text-sm">
                            <Users className="h-4 w-4 flex-shrink-0" />
                            {project.users} pengguna
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                          project.status === 'active'
                            ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400'
                            : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400'
                        }`}>
                          {project.status === 'active' ? 'Aktif' : 'Draft'}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Zap}
            title="Belum ada proyek"
            description="Mulai buat chatbot AI pertama Anda dan tingkatkan engagement pelanggan"
            action={{
              label: "Buat Proyek Baru",
              href: "/dashboard/create"
            }}
          />
        )}
      </div>

      {/* Info Section */}
      <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <CardContent className="p-6">
          <div className="flex gap-4">
            <Eye className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                💡 Tips: Maksimalkan Performa Chatbot
              </h3>
              <p className="text-blue-700 dark:text-blue-300 text-sm">
                Upload dokumen knowledge base yang relevan untuk meningkatkan akurasi jawaban AI Anda dan memberikan pengalaman terbaik kepada pengguna.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
