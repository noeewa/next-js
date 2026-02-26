"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Sparkles, Menu, X, LogOut, Settings } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getCurrentUser, logoutSession } from "@/lib/auth"

export function AppNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<string | null>(null)

  useEffect(() => {
    setCurrentUser(getCurrentUser())
  }, [])

  // Get breadcrumb info based on current route
  const getBreadcrumb = () => {
    if (pathname === "/dashboard") {
      return "Dashboard"
    }
    if (pathname.includes("/dashboard/create")) {
      if (pathname.includes("/payment")) {
        return "Buat Proyek > Pembayaran"
      }
      return "Buat Proyek"
    }
    if (pathname.includes("/dashboard/") && !pathname.includes("/create")) {
      // Extract project name from URL - this will be shown in ProjectNav instead
      return "Proyek"
    }
    return null
  }

  const breadcrumb = getBreadcrumb()

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-full px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between h-10">
            {/* Left: Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg hidden sm:inline">ChatBot Builder</span>
            </Link>

            {/* Center: Breadcrumb (Desktop Only) */}
            {breadcrumb && (
              <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
                <span>/</span>
                <span>{breadcrumb}</span>
              </div>
            )}

            {/* Right: User Menu & Mobile Toggle */}
            <div className="flex items-center gap-3">
              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-full w-10 h-10 p-0"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white text-sm font-semibold">
                      {currentUser ? currentUser.charAt(0).toUpperCase() : "U"}
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="px-2 py-1.5 text-sm">
                    <p className="font-semibold">{currentUser || "User"}</p>
                    <p className="text-xs text-muted-foreground">{currentUser}@example.com</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Pengaturan</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Tagihan</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => {
                      logoutSession()
                      router.replace("/login")
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Keluar</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-muted/50 border-b border-border/40">
          <div className="px-4 py-3 space-y-2 text-sm">
            <Link href="/dashboard">
              <Button variant="ghost" className="w-full justify-start">
                Dashboard
              </Button>
            </Link>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pengaturan
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => {
                logoutSession()
                router.replace("/login")
              }}
            >
              Keluar
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
