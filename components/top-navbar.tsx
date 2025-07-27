"use client"

import { Button } from "@/components/ui/button"
import { AlertTriangle, Users, Activity, Wifi } from "lucide-react"

interface SystemStats {
  totalCameras: number
  onlineCameras: number
  warningCameras: number
  offlineCameras: number
  peopleDetected: number
  bagsDetected: number
  alertsCount: number
  systemHealth: number
}

interface TopNavbarProps {
  systemStats: SystemStats
  isConnected: boolean
}

export function TopNavbar({ systemStats, isConnected }: TopNavbarProps) {
  return (
    <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">NETRA AI</h1>
          </div>

          {/* Connection Status */}
          <div className="flex items-center gap-2">
            <Wifi className={`h-4 w-4 ${isConnected ? "text-green-400" : "text-red-400"}`} />
            <span className={`text-sm ${isConnected ? "text-green-400" : "text-red-400"}`}>
              {isConnected ? "Connected" : "Disconnected"}
            </span>
          </div>
        </div>

        {/* System Stats - Simplified */}
        <div className="flex items-center gap-6">
          {/* Camera Status */}
          <div className="flex items-center gap-2 bg-gray-700 px-3 py-2 rounded-lg">
            <Activity className="h-4 w-4 text-blue-400" />
            <span className="text-sm text-gray-300">Cameras:</span>
            <span className="text-green-400 font-semibold">{systemStats.onlineCameras}</span>
            <span className="text-gray-400">/</span>
            <span className="text-white font-semibold">{systemStats.totalCameras}</span>
          </div>

          {/* People Detected */}
          <div className="flex items-center gap-2 bg-gray-700 px-3 py-2 rounded-lg">
            <Users className="h-4 w-4 text-green-400" />
            <span className="text-sm text-gray-300">People:</span>
            <span className="text-white font-semibold">{systemStats.peopleDetected}</span>
          </div>

          {/* Alerts */}
          <div className="flex items-center gap-2 bg-gray-700 px-3 py-2 rounded-lg">
            <AlertTriangle className="h-4 w-4 text-red-400" />
            <span className="text-sm text-gray-300">Alerts:</span>
            <span className="text-red-400 font-semibold">{systemStats.alertsCount}</span>
          </div>

          {/* System Health */}
          <div className="flex items-center gap-2 bg-gray-700 px-3 py-2 rounded-lg">
            <span className="text-sm text-gray-300">Health:</span>
            <span className="text-green-400 font-semibold">{systemStats.systemHealth}%</span>
          </div>

          {/* Emergency Button */}
          <Button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6">
            <AlertTriangle className="h-4 w-4 mr-2" />
            EMERGENCY
          </Button>
        </div>
      </div>
    </header>
  )
}
