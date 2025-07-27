"use client"

import { useState, useEffect } from "react"

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
  image: string
  detections: any[]
  isWebcam?: boolean
  fps: number
  resolution: string
  lastActivity: string
  temperature: number
  uptime: number
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

  const [cameras, setCameras] = useState<Camera[]>([
    {
      id: "CAM_MAIN_01",
      location: "Main Entrance",
      status: "live",
      timestamp: "22:20:16",
      image: "/placeholder.svg?height=300&width=400&text=Main+Entrance",
      detections: [],
      isWebcam: true,
      fps: 30,
      resolution: "1080p",
      lastActivity: "2s ago",
      temperature: 42,
      uptime: 99.8,
    },
    {
      id: "CAM_LOBBY_02",
      location: "Reception Lobby",
      status: "live",
      timestamp: "22:20:16",
      image: "/placeholder.svg?height=300&width=400&text=Reception+Lobby",
      detections: [],
      fps: 25,
      resolution: "720p",
      lastActivity: "1s ago",
      temperature: 38,
      uptime: 98.5,
    },
    {
      id: "CAM_HALL_03",
      location: "Main Hallway",
      status: "live",
      timestamp: "22:20:16",
      image: "/placeholder.svg?height=300&width=400&text=Main+Hallway",
      detections: [
        {
          type: "Person",
          confidence: 94,
          x: 150,
          y: 100,
          width: 80,
          height: 120,
          timestamp: "22:20:16",
        },
      ],
      fps: 30,
      resolution: "1080p",
      lastActivity: "3s ago",
      temperature: 41,
      uptime: 99.2,
    },
    {
      id: "CAM_LAB_04",
      location: "Computer Lab",
      status: "warning",
      timestamp: "22:20:16",
      image: "/placeholder.svg?height=300&width=400&text=Computer+Lab",
      detections: [],
      fps: 20,
      resolution: "720p",
      lastActivity: "5s ago",
      temperature: 45,
      uptime: 95.3,
    },
    {
      id: "CAM_PARK_05",
      location: "Parking Lot",
      status: "live",
      timestamp: "22:20:16",
      image: "/placeholder.svg?height=300&width=400&text=Parking+Lot",
      detections: [
        {
          type: "Person",
          confidence: 89,
          x: 200,
          y: 150,
          width: 70,
          height: 110,
          timestamp: "22:20:16",
        },
      ],
      fps: 25,
      resolution: "1080p",
      lastActivity: "2s ago",
      temperature: 39,
      uptime: 97.8,
    },
    {
      id: "CAM_CAFE_06",
      location: "Cafeteria",
      status: "live",
      timestamp: "22:20:16",
      image: "/placeholder.svg?height=300&width=400&text=Cafeteria",
      detections: [],
      fps: 30,
      resolution: "720p",
      lastActivity: "1s ago",
      temperature: 43,
      uptime: 99.1,
    },
    {
      id: "CAM_LIB_07",
      location: "Library",
      status: "offline",
      timestamp: "22:20:16",
      image: "/placeholder.svg?height=300&width=400&text=Library",
      detections: [],
      fps: 0,
      resolution: "N/A",
      lastActivity: "5m ago",
      temperature: 0,
      uptime: 0,
    },
    {
      id: "CAM_GYM_08",
      location: "Gymnasium",
      status: "live",
      timestamp: "22:20:16",
      image: "/placeholder.svg?height=300&width=400&text=Gymnasium",
      detections: [],
      fps: 25,
      resolution: "1080p",
      lastActivity: "4s ago",
      temperature: 40,
      uptime: 98.7,
    },
  ])

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
