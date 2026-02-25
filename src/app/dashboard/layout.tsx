import { ReactNode } from 'react'
import { AppNavbar } from '@/components/app-navbar'
import { Metadata } from 'next'
import { Props } from "@/type/type"

export const metadata: Metadata = {
  title: "Dashboard - ChatBot Builder",
  description: "Manage your chatbot projects and analytics",
}

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppNavbar />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto w-full py-6 px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  )
}
