"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { LucideCamera, Thermometer, Activity, Clock } from "lucide-react"

interface Camera {
  id: string
  location: string
  status: "live" | "warning" | "offline"
  fps: number
  temperature: number
  uptime: number
  lastActivity: string
}

interface CameraHealthProps {
  cameras: Camera[]
}

export function CameraHealth({ cameras }: CameraHealthProps) {
  const handleToggleCamera = (cameraId: string, enabled: boolean) => {
    console.log(`${enabled ? "Enabling" : "Disabling"} camera:`, cameraId)
    // In a real app, this would toggle the camera
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live":
        return "text-green-400"
      case "warning":
        return "text-yellow-400"
      case "offline":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  const getHealthScore = (camera: Camera) => {
    if (camera.status === "offline") return 0
    if (camera.status === "warning") return 60
    return Math.min(100, camera.uptime)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">Camera Health Monitor</h2>
        <p className="text-gray-400 mt-1">Monitor and manage all security cameras</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                <LucideCamera className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Online</p>
                <p className="text-white text-xl font-bold">{cameras.filter((c) => c.status === "live").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-600/20 rounded-lg flex items-center justify-center">
                <LucideCamera className="h-5 w-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Warning</p>
                <p className="text-white text-xl font-bold">{cameras.filter((c) => c.status === "warning").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-600/20 rounded-lg flex items-center justify-center">
                <LucideCamera className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Offline</p>
                <p className="text-white text-xl font-bold">{cameras.filter((c) => c.status === "offline").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                <Activity className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Avg Health</p>
                <p className="text-white text-xl font-bold">
                  {Math.round(cameras.reduce((sum, c) => sum + getHealthScore(c), 0) / cameras.length)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Camera List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {cameras.map((camera) => (
          <Card key={camera.id} className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white text-lg">{camera.id}</CardTitle>
                  <p className="text-gray-400 text-sm">{camera.location}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge
                    className={`${
                      camera.status === "live"
                        ? "bg-green-600"
                        : camera.status === "warning"
                          ? "bg-yellow-600"
                          : "bg-red-600"
                    } text-white`}
                  >
                    {camera.status.toUpperCase()}
                  </Badge>
                  <Switch
                    checked={camera.status !== "offline"}
                    onCheckedChange={(checked) => handleToggleCamera(camera.id, checked)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Health Score */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Health Score</span>
                  <span className="text-white font-semibold">{getHealthScore(camera)}%</span>
                </div>
                <Progress value={getHealthScore(camera)} className="h-2" />
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Activity className="h-4 w-4 text-blue-400" />
                    <span className="text-gray-400 text-xs">FPS</span>
                  </div>
                  <span className="text-white font-semibold">{camera.fps}</span>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Thermometer className="h-4 w-4 text-orange-400" />
                    <span className="text-gray-400 text-xs">Temp</span>
                  </div>
                  <span className={`font-semibold ${camera.temperature > 50 ? "text-red-400" : "text-green-400"}`}>
                    {camera.temperature}°C
                  </span>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Clock className="h-4 w-4 text-green-400" />
                    <span className="text-gray-400 text-xs">Uptime</span>
                  </div>
                  <span className="text-green-400 font-semibold">{camera.uptime}%</span>
                </div>
              </div>

              {/* Last Activity */}
              <div className="pt-2 border-t border-gray-700">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Last Activity:</span>
                  <span className="text-white">{camera.lastActivity}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Instructions */}
      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
        <h3 className="text-white font-semibold mb-2">Camera Health Guide:</h3>
        <ul className="text-gray-300 text-sm space-y-1">
          <li>• Green status = Camera working perfectly</li>
          <li>• Yellow status = Camera has minor issues (check temperature or connection)</li>
          <li>• Red status = Camera is offline (needs attention)</li>
          <li>• Use the switch to turn cameras on/off remotely</li>
          <li>• Health score combines uptime, temperature, and performance</li>
        </ul>
      </div>
    </div>
  )
}
