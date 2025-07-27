"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { LucideCamera, Thermometer, Activity, Clock, Power, PowerOff, Video, Globe } from "lucide-react"

interface Camera {
  id: string
  location: string
  status: "live" | "warning" | "offline"
  fps: number
  temperature: number
  uptime: number
  lastActivity: string
  isEnabled?: boolean
  videoUrl?: string
  type?: "mp4" | "iframe"
  isWebcam?: boolean
}

interface CameraHealthProps {
  cameras: Camera[]
  onToggleCamera: (cameraId: string, enabled: boolean) => void
}

export function CameraHealth({ cameras, onToggleCamera }: CameraHealthProps) {
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
    if (camera.isEnabled === false) return 0
    if (camera.status === "offline") return 0
    if (camera.status === "warning") return 60
    return Math.min(100, camera.uptime)
  }

  const enabledCameras = cameras.filter((c) => c.isEnabled !== false)
  const disabledCameras = cameras.filter((c) => c.isEnabled === false)
  const videoCameras = cameras.filter((c) => c.videoUrl)
  const webcamCameras = cameras.filter((c) => c.isWebcam)

  const handleToggleAll = (enable: boolean) => {
    cameras.forEach((camera) => {
      onToggleCamera(camera.id, enable)
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Camera Health Monitor</h2>
          <p className="text-gray-400 mt-1">Monitor and manage all security cameras</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => handleToggleAll(true)} className="bg-green-600 hover:bg-green-700 text-white">
            <Power className="h-4 w-4 mr-2" />
            Turn All On
          </Button>
          <Button
            onClick={() => handleToggleAll(false)}
            variant="outline"
            className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
          >
            <PowerOff className="h-4 w-4 mr-2" />
            Turn All Off
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                <LucideCamera className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Online</p>
                <p className="text-white text-xl font-bold">
                  {enabledCameras.filter((c) => c.status === "live").length}
                </p>
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
                <p className="text-white text-xl font-bold">
                  {enabledCameras.filter((c) => c.status === "warning").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-600/20 rounded-lg flex items-center justify-center">
                <PowerOff className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Disabled</p>
                <p className="text-white text-xl font-bold">{disabledCameras.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
                <Video className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Video Feeds</p>
                <p className="text-white text-xl font-bold">{videoCameras.length}</p>
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
                  {enabledCameras.length > 0
                    ? Math.round(enabledCameras.reduce((sum, c) => sum + getHealthScore(c), 0) / enabledCameras.length)
                    : 0}
                  %
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Camera List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {cameras.map((camera) => (
          <Card
            key={camera.id}
            className={`bg-gray-800 border-gray-700 transition-all duration-200 ${
              camera.isEnabled === false ? "opacity-60" : ""
            }`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white text-lg flex items-center gap-2">
                    {camera.id}
                    {camera.isEnabled === false && <PowerOff className="h-4 w-4 text-gray-500" />}
                    {camera.videoUrl && <Video className="h-4 w-4 text-purple-400" />}
                    {camera.isWebcam && <Globe className="h-4 w-4 text-blue-400" />}
                  </CardTitle>
                  <p className="text-gray-400 text-sm">{camera.location}</p>
                  {camera.videoUrl && (
                    <p className="text-purple-400 text-xs mt-1">{camera.type?.toUpperCase()} Video Feed Available</p>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  {camera.isEnabled === false ? (
                    <Badge className="bg-gray-600 text-gray-300">DISABLED</Badge>
                  ) : (
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
                  )}
                  <Switch
                    checked={camera.isEnabled !== false}
                    onCheckedChange={(checked) => onToggleCamera(camera.id, checked)}
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
                  <span className="text-white font-semibold">{camera.isEnabled === false ? "N/A" : camera.fps}</span>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Thermometer className="h-4 w-4 text-orange-400" />
                    <span className="text-gray-400 text-xs">Temp</span>
                  </div>
                  <span
                    className={`font-semibold ${
                      camera.isEnabled === false
                        ? "text-gray-500"
                        : camera.temperature > 50
                          ? "text-red-400"
                          : "text-green-400"
                    }`}
                  >
                    {camera.isEnabled === false ? "N/A" : `${camera.temperature}°C`}
                  </span>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Clock className="h-4 w-4 text-green-400" />
                    <span className="text-gray-400 text-xs">Uptime</span>
                  </div>
                  <span className="text-green-400 font-semibold">
                    {camera.isEnabled === false ? "0%" : `${camera.uptime}%`}
                  </span>
                </div>
              </div>

              {/* Last Activity */}
              <div className="pt-2 border-t border-gray-700">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Last Activity:</span>
                  <span className="text-white">
                    {camera.isEnabled === false ? "Camera disabled" : camera.lastActivity}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Instructions */}
      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
        <h3 className="text-white font-semibold mb-2">Camera Control Guide:</h3>
        <ul className="text-gray-300 text-sm space-y-1">
          <li>• Use the switch next to each camera to turn it on/off</li>
          <li>• "Turn All On/Off" buttons control all cameras at once</li>
          <li>• Disabled cameras will show "Camera is Off" in the Live Monitor</li>
          <li>• Purple video icon = Real video feed available (MP4/iframe)</li>
          <li>• Blue globe icon = Webcam with AI detection capability</li>
          <li>• Green status = Camera working perfectly</li>
          <li>• Yellow status = Camera has minor issues</li>
          <li>• Red status = Camera is offline (technical problem)</li>
          <li>• Gray "DISABLED" = Camera was manually turned off</li>
        </ul>
      </div>
    </div>
  )
}
