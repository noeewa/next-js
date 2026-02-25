"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowLeft, Edit, Pause, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ProjectNavProps {
  projectName: string
  projectId: string
  status: "active" | "draft" | "inactive"
  isActive: boolean
  onToggleStatus?: () => void
}

export function ProjectNav({
  projectName,
  projectId,
  status,
  isActive,
  onToggleStatus,
}: ProjectNavProps) {
  const pathname = usePathname()

  const statusConfig: Record<string, { bgColor: string; textColor: string; label: string }> = {
    active: {
      bgColor: "bg-green-100 dark:bg-green-950",
      textColor: "text-green-700 dark:text-green-400",
      label: "Aktif",
    },
    draft: {
      bgColor: "bg-yellow-100 dark:bg-yellow-950",
      textColor: "text-yellow-700 dark:text-yellow-400",
      label: "Draft",
    },
    inactive: {
      bgColor: "bg-red-100 dark:bg-red-950",
      textColor: "text-red-700 dark:text-red-400",
      label: "Nonaktif",
    },
  }

  const currentStatus = statusConfig[status]

  // Determine active tab based on pathname
  const getActiveTab = () => {
    if (pathname.includes("/settings")) return "settings"
    if (pathname.includes("/analytics")) return "analytics"
    if (pathname.includes("/conversations")) return "conversations"
    if (pathname.includes("/integrations")) return "integrations"
    return "overview"
  }

  const activeTab = getActiveTab()

  return (
    <div className="border-b border-border/40 bg-background/50 sticky top-16 z-40">
      <div className="max-w-full px-4 sm:px-6 py-4 space-y-4">
        {/* Project Header */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon" className="flex-shrink-0">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg font-semibold truncate">{projectName}</h2>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${currentStatus.bgColor} ${currentStatus.textColor}`}
                >
                  {currentStatus.label}
                </span>
              </div>
            </div>
          </div>

          {/* Project Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              variant={isActive ? "destructive" : "outline"}
              size="sm"
              onClick={onToggleStatus}
              className="gap-2"
            >
              {isActive ? (
                <>
                  <Pause className="h-4 w-4" />
                  <span className="hidden sm:inline">Matikan</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  <span className="hidden sm:inline">Aktifkan</span>
                </>
              )}
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Edit className="h-4 w-4" />
              <span className="hidden sm:inline">Edit</span>
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} className="w-full">
          <TabsList className="bg-transparent border-b border-border/40 w-full justify-start p-0 h-auto rounded-none">
            <TabsTrigger
              value="overview"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
              asChild
            >
              <Link href={`/dashboard/${projectId}`}>
                Overview
              </Link>
            </TabsTrigger>
            <TabsTrigger
              value="conversations"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
              asChild
            >
              <Link href={`/dashboard/${projectId}/conversations`}>
                Percakapan
              </Link>
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
              asChild
            >
              <Link href={`/dashboard/${projectId}/analytics`}>
                Analytics
              </Link>
            </TabsTrigger>
            <TabsTrigger
              value="integrations"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
              asChild
            >
              <Link href={`/dashboard/${projectId}/integrations`}>
                Integrasi
              </Link>
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
              asChild
            >
              <Link href={`/dashboard/${projectId}/settings`}>
                Pengaturan
              </Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  )
}
