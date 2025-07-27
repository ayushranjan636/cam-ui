"use client"

import { useState, useEffect } from "react"
import { mockCameras } from "@/components/mock-data"

interface SystemStats {
  totalCameras: number
  onlineCameras: number
  warningCameras: number
  offlineCameras: number
  peopleDetected: number
  bagsDetected: number
  alertsCount: number
  systemHealth: number
  cpuUsage: number
  memoryUsage: number
  networkLatency: number
  uptime: string
}

interface Alert {
  id: string
  type: string
  message: string
  location: string
  timestamp: string
  status: "active" | "acknowledged"
  confidence: number
  priority: "high" | "medium" | "low"
}

interface Camera {
  id: string
  location: string
  status: "live" | "warning" | "offline"
  timestamp: string
  image?: string
  videoUrl?: string
  type?: "mp4" | "iframe"
  detections: any[]
  isWebcam?: boolean
  fps: number
  resolution: string
  lastActivity: string
  temperature: number
  uptime: number
  isEnabled?: boolean
}

export function useRealTimeData() {
  const [systemStats, setSystemStats] = useState<SystemStats>({
    totalCameras: 8,
    onlineCameras: 6,
    warningCameras: 1,
    offlineCameras: 1,
    peopleDetected: 47,
    bagsDetected: 12,
    alertsCount: 4,
    systemHealth: 99.2,
    cpuUsage: 45,
    memoryUsage: 67,
    networkLatency: 12,
    uptime: "99.8%",
  })

  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      type: "Person Detected",
      message: "Unauthorized person detected in restricted area",
      location: "Main Entrance",
      timestamp: "18:35:44",
      status: "active",
      confidence: 96,
      priority: "high",
    },
    {
      id: "2",
      type: "Suspicious Activity",
      message: "Unusual movement pattern detected",
      location: "Main Hallway",
      timestamp: "18:35:44",
      status: "active",
      confidence: 87,
      priority: "high",
    },
    {
      id: "3",
      type: "Restricted Area Breach",
      message: "Person entered restricted zone",
      location: "Parking Lot",
      timestamp: "18:35:44",
      status: "active",
      confidence: 92,
      priority: "high",
    },
    {
      id: "4",
      type: "Camera Fault",
      message: "Camera connection unstable",
      location: "Library",
      timestamp: "18:35:44",
      status: "active",
      confidence: 78,
      priority: "medium",
    },
  ])

  const [cameras, setCameras] = useState<Camera[]>(mockCameras)
  const [isConnected, setIsConnected] = useState(true)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update timestamp
      const now = new Date()
      const timestamp = now.toLocaleTimeString("en-US", { hour12: false })

      // Update cameras with new timestamp
      setCameras((prev) =>
        prev.map((camera) => ({
          ...camera,
          timestamp,
        })),
      )

      // Randomly update people detected count
      setSystemStats((prev) => ({
        ...prev,
        peopleDetected: prev.peopleDetected + (Math.random() > 0.7 ? 1 : 0),
        cpuUsage: Math.max(30, Math.min(80, prev.cpuUsage + (Math.random() - 0.5) * 10)),
        memoryUsage: Math.max(50, Math.min(90, prev.memoryUsage + (Math.random() - 0.5) * 5)),
        networkLatency: Math.max(5, Math.min(50, prev.networkLatency + (Math.random() - 0.5) * 5)),
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return {
    systemStats,
    alerts,
    cameras,
    isConnected,
  }
}
