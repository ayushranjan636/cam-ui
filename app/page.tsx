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

  // State to track which cameras are enabled/disabled
  const [cameraStates, setCameraStates] = useState<Record<string, boolean>>(() => {
    const initialStates: Record<string, boolean> = {}
    cameras.forEach((camera) => {
      initialStates[camera.id] = camera.status !== "offline"
    })
    return initialStates
  })

  // Function to toggle camera on/off
  const toggleCamera = (cameraId: string, enabled: boolean) => {
    setCameraStates((prev) => ({
      ...prev,
      [cameraId]: enabled,
    }))
  }

  // Function to get updated cameras with current states
  const getUpdatedCameras = () => {
    return cameras.map((camera) => ({
      ...camera,
      isEnabled: cameraStates[camera.id] ?? true,
      status: cameraStates[camera.id] === false ? ("offline" as const) : camera.status,
    }))
  }

  const updatedCameras = getUpdatedCameras()

  const renderContent = () => {
    switch (activeTab) {
      case "live-monitor":
        return <LiveMonitor cameras={updatedCameras} />
      case "alert-center":
        return <AlertCenter alerts={alerts} />
      case "evidence-bank":
        return <EvidenceBank />
      case "camera-health":
        return <CameraHealth cameras={updatedCameras} onToggleCamera={toggleCamera} />
      case "ai-tuning":
        return <AITuning />
      case "analytics":
        return <Analytics systemStats={systemStats} cameras={updatedCameras} alerts={alerts} />
      default:
        return <LiveMonitor cameras={updatedCameras} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <SidebarProvider defaultOpen={true}>
        <div className="flex h-screen">
          <AppSidebar activeTab={activeTab} setActiveTab={setActiveTab} alertCount={alerts.length} />
          <div className="flex-1 flex flex-col">
            <TopNavbar systemStats={systemStats} isConnected={isConnected} />
            <main className="flex-1 overflow-auto p-4">{renderContent()}</main>
          </div>
        </div>
        <NotificationSystem />
        <Toaster />
      </SidebarProvider>
    </div>
  )
}
