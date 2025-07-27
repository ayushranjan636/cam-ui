"use client"

import { useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { TopNavbar } from "@/components/top-navbar"
import { LiveMonitor } from "@/components/live-monitor"
import { AlertCenter } from "@/components/alert-center"
import { EvidenceBank } from "@/components/evidence-bank"
import { CameraHealth } from "@/components/camera-health"
import { AITuning } from "@/components/ai-tuning"
import { Analytics } from "@/components/analytics"
import { NotificationSystem } from "@/components/notification-system"
import { useRealTimeData } from "@/hooks/use-realtime-data"
import { Toaster } from "@/components/ui/toaster"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("live-monitor")
  const { systemStats, alerts, cameras, isConnected } = useRealTimeData()

  const renderContent = () => {
    switch (activeTab) {
      case "live-monitor":
        return <LiveMonitor cameras={cameras} />
      case "alert-center":
        return <AlertCenter alerts={alerts} />
      case "evidence-bank":
        return <EvidenceBank />
      case "camera-health":
        return <CameraHealth cameras={cameras} />
      case "ai-tuning":
        return <AITuning />
      case "analytics":
        return <Analytics systemStats={systemStats} cameras={cameras} alerts={alerts} />
      default:
        return <LiveMonitor cameras={cameras} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white">
      <SidebarProvider defaultOpen={true}>
        <div className="flex h-screen">
          <AppSidebar activeTab={activeTab} setActiveTab={setActiveTab} alertCount={alerts.length} />
          <div className="flex-1 flex flex-col">
            <TopNavbar systemStats={systemStats} isConnected={isConnected} />
            <main className="flex-1 overflow-auto p-6">{renderContent()}</main>
          </div>
        </div>
        <NotificationSystem />
        <Toaster />
      </SidebarProvider>
    </div>
  )
}
