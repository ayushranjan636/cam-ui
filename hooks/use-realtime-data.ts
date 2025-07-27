"use client"

import { useState, useEffect, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"

interface SystemStats {
  totalCameras: number
  onlineCameras: number
  warningCameras: number
  offlineCameras: number
  peopleDetected: number
  bagsDetected: number
  activeAlerts: number
  systemHealth: number
  cpuUsage: number
  memoryUsage: number
  networkLatency: number
  uptime: string
}

interface Detection {
  type: string
  confidence: number
  x: number
  y: number
  width: number
  height: number
  timestamp: string
}

interface Camera {
  id: string
  location: string
  status: "live" | "warning" | "offline"
  timestamp: string
  image: string
  detections: Detection[]
  isWebcam?: boolean
  fps: number
  resolution: string
  lastActivity: string
  temperature: number
  uptime: number
}

interface Alert {
  id: string
  priority: "HIGH" | "MEDIUM" | "LOW"
  type: string
  description: string
  location: string
  cameraId: string
  timestamp: string
  confidence: number
  image: string
  status: "active" | "acknowledged" | "resolved"
  assignedTo?: string
}

export function useRealTimeData() {
  const { toast } = useToast()
  const [isConnected, setIsConnected] = useState(true)
  const [systemStats, setSystemStats] = useState<SystemStats>({
    totalCameras: 8,
    onlineCameras: 6,
    warningCameras: 1,
    offlineCameras: 1,
    peopleDetected: 47,
    bagsDetected: 12,
    activeAlerts: 4,
    systemHealth: 99.2,
    cpuUsage: 45,
    memoryUsage: 67,
    networkLatency: 12,
    uptime: "7d 14h 32m",
  })

  const [cameras, setCameras] = useState<Camera[]>([
    {
      id: "CAM_MAIN_01",
      location: "Main Entrance",
      status: "live",
      timestamp: new Date().toLocaleTimeString(),
      image: "/placeholder.svg?height=200&width=300",
      detections: [],
      isWebcam: true,
      fps: 30,
      resolution: "1920x1080",
      lastActivity: "2s ago",
      temperature: 42,
      uptime: 99.8,
    },
    {
      id: "CAM_LOBBY_02",
      location: "Reception Lobby",
      status: "live",
      timestamp: new Date().toLocaleTimeString(),
      image: "/placeholder.svg?height=200&width=300",
      detections: [],
      fps: 25,
      resolution: "1280x720",
      lastActivity: "1s ago",
      temperature: 38,
      uptime: 99.5,
    },
    {
      id: "CAM_HALL_03",
      location: "Main Hallway",
      status: "live",
      timestamp: new Date().toLocaleTimeString(),
      image: "/placeholder.svg?height=200&width=300",
      detections: [
        {
          type: "Person",
          confidence: 94,
          x: 120,
          y: 80,
          width: 60,
          height: 120,
          timestamp: new Date().toISOString(),
        },
      ],
      fps: 30,
      resolution: "1920x1080",
      lastActivity: "now",
      temperature: 41,
      uptime: 99.9,
    },
    {
      id: "CAM_LAB_04",
      location: "Computer Lab",
      status: "warning",
      timestamp: new Date().toLocaleTimeString(),
      image: "/placeholder.svg?height=200&width=300",
      detections: [],
      fps: 15,
      resolution: "1280x720",
      lastActivity: "5s ago",
      temperature: 55,
      uptime: 97.2,
    },
    {
      id: "CAM_PARK_05",
      location: "Parking Lot",
      status: "live",
      timestamp: new Date().toLocaleTimeString(),
      image: "/placeholder.svg?height=200&width=300",
      detections: [
        {
          type: "Vehicle",
          confidence: 87,
          x: 200,
          y: 150,
          width: 100,
          height: 60,
          timestamp: new Date().toISOString(),
        },
      ],
      fps: 20,
      resolution: "1920x1080",
      lastActivity: "3s ago",
      temperature: 39,
      uptime: 99.1,
    },
    {
      id: "CAM_CAFE_06",
      location: "Cafeteria",
      status: "live",
      timestamp: new Date().toLocaleTimeString(),
      image: "/placeholder.svg?height=200&width=300",
      detections: [],
      fps: 25,
      resolution: "1280x720",
      lastActivity: "4s ago",
      temperature: 43,
      uptime: 98.8,
    },
    {
      id: "CAM_LIB_07",
      location: "Library",
      status: "offline",
      timestamp: new Date().toLocaleTimeString(),
      image: "/placeholder.svg?height=200&width=300",
      detections: [],
      fps: 0,
      resolution: "N/A",
      lastActivity: "2m ago",
      temperature: 0,
      uptime: 85.3,
    },
    {
      id: "CAM_GYM_08",
      location: "Gymnasium",
      status: "live",
      timestamp: new Date().toLocaleTimeString(),
      image: "/placeholder.svg?height=200&width=300",
      detections: [],
      fps: 30,
      resolution: "1920x1080",
      lastActivity: "1s ago",
      temperature: 44,
      uptime: 99.7,
    },
  ])

  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "ALT_001",
      priority: "HIGH",
      type: "UNAUTHORIZED_ACCESS",
      description: "Unauthorized person detected in restricted area",
      location: "Main Entrance",
      cameraId: "CAM_MAIN_01",
      timestamp: new Date(Date.now() - 300000).toISOString(),
      confidence: 96,
      image: "/placeholder.svg?height=400&width=600",
      status: "active",
    },
    {
      id: "ALT_002",
      priority: "HIGH",
      type: "SUSPICIOUS_BEHAVIOR",
      description: "Suspicious activity detected - loitering",
      location: "Main Hallway",
      cameraId: "CAM_HALL_03",
      timestamp: new Date(Date.now() - 600000).toISOString(),
      confidence: 87,
      image: "/placeholder.svg?height=400&width=600",
      status: "active",
    },
    {
      id: "ALT_003",
      priority: "MEDIUM",
      type: "OBJECT_LEFT_BEHIND",
      description: "Unattended bag detected",
      location: "Parking Lot",
      cameraId: "CAM_PARK_05",
      timestamp: new Date(Date.now() - 900000).toISOString(),
      confidence: 92,
      image: "/placeholder.svg?height=400&width=600",
      status: "acknowledged",
    },
    {
      id: "ALT_004",
      priority: "LOW",
      type: "CAMERA_MALFUNCTION",
      description: "Camera temperature above normal threshold",
      location: "Computer Lab",
      cameraId: "CAM_LAB_04",
      timestamp: new Date(Date.now() - 1200000).toISOString(),
      confidence: 100,
      image: "/placeholder.svg?height=400&width=600",
      status: "active",
    },
  ])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update timestamps
      setCameras((prev) =>
        prev.map((camera) => ({
          ...camera,
          timestamp: new Date().toLocaleTimeString(),
        })),
      )

      // Randomly update system stats
      setSystemStats((prev) => ({
        ...prev,
        peopleDetected: prev.peopleDetected + Math.floor(Math.random() * 3) - 1,
        bagsDetected: prev.bagsDetected + Math.floor(Math.random() * 2) - 1,
        cpuUsage: Math.max(20, Math.min(80, prev.cpuUsage + Math.floor(Math.random() * 10) - 5)),
        memoryUsage: Math.max(30, Math.min(90, prev.memoryUsage + Math.floor(Math.random() * 8) - 4)),
        networkLatency: Math.max(5, Math.min(50, prev.networkLatency + Math.floor(Math.random() * 6) - 3)),
      }))

      // Simulate random detections
      if (Math.random() < 0.3) {
        setCameras((prev) =>
          prev.map((camera) => {
            if (camera.status === "live" && Math.random() < 0.2) {
              const detectionTypes = ["Person", "Vehicle", "Bag", "Face"]
              const randomType = detectionTypes[Math.floor(Math.random() * detectionTypes.length)]
              return {
                ...camera,
                detections: [
                  {
                    type: randomType,
                    confidence: Math.floor(Math.random() * 20) + 80,
                    x: Math.floor(Math.random() * 200),
                    y: Math.floor(Math.random() * 150),
                    width: Math.floor(Math.random() * 80) + 40,
                    height: Math.floor(Math.random() * 100) + 60,
                    timestamp: new Date().toISOString(),
                  },
                ],
                lastActivity: "now",
              }
            }
            return camera
          }),
        )
      }

      // Simulate new alerts occasionally
      if (Math.random() < 0.05) {
        const newAlert: Alert = {
          id: `ALT_${Date.now()}`,
          priority: Math.random() < 0.3 ? "HIGH" : Math.random() < 0.6 ? "MEDIUM" : "LOW",
          type: "MOTION_DETECTED",
          description: "Motion detected in monitored area",
          location: "Random Location",
          cameraId: `CAM_${Math.floor(Math.random() * 8) + 1}`,
          timestamp: new Date().toISOString(),
          confidence: Math.floor(Math.random() * 20) + 80,
          image: "/placeholder.svg?height=400&width=600",
          status: "active",
        }

        setAlerts((prev) => [newAlert, ...prev.slice(0, 9)])

        toast({
          title: "New Alert",
          description: `${newAlert.type} detected at ${newAlert.location}`,
          variant: newAlert.priority === "HIGH" ? "destructive" : "default",
        })
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [toast])

  const acknowledgeAlert = useCallback((alertId: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, status: "acknowledged" } : alert)))
  }, [])

  const escalateAlert = useCallback(
    (alertId: string) => {
      setAlerts((prev) =>
        prev.map((alert) =>
          alert.id === alertId ? { ...alert, priority: "HIGH", assignedTo: "Security Team" } : alert,
        ),
      )
      toast({
        title: "Alert Escalated",
        description: "Alert has been escalated to security team",
        variant: "destructive",
      })
    },
    [toast],
  )

  return {
    systemStats,
    cameras,
    alerts,
    isConnected,
    acknowledgeAlert,
    escalateAlert,
  }
}
