"use client"

import { EnhancedCameraCard } from "@/components/enhanced-camera-card"

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

interface LiveMonitorProps {
  cameras: Camera[]
}

export function LiveMonitor({ cameras }: LiveMonitorProps) {
  const activeCameras = cameras.filter((camera) => camera.isEnabled !== false)
  const disabledCameras = cameras.filter((camera) => camera.isEnabled === false)
  const videoCameras = cameras.filter((camera) => camera.videoUrl)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Live Camera Monitor</h2>
          <p className="text-gray-400 mt-1">Watch all security cameras in real-time</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-sm font-medium">{activeCameras.length} CAMERAS ACTIVE</span>
          </div>
          {videoCameras.length > 0 && (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="text-purple-400 text-sm font-medium">{videoCameras.length} VIDEO FEEDS</span>
            </div>
          )}
          {disabledCameras.length > 0 && (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-red-400 text-sm font-medium">{disabledCameras.length} CAMERAS OFF</span>
            </div>
          )}
        </div>
      </div>

      {/* Camera Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cameras.map((camera) => (
          <EnhancedCameraCard key={camera.id} camera={camera} />
        ))}
      </div>

      {/* Instructions for Users */}
      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
        <h3 className="text-white font-semibold mb-2">How to Use:</h3>
        <ul className="text-gray-300 text-sm space-y-1">
          <li>• Green badge = Camera is working normally</li>
          <li>• Yellow badge = Camera has a warning</li>
          <li>• Red badge = Camera is offline</li>
          <li>• Gray "CAMERA OFF" = Camera was manually disabled</li>
          <li>• Purple "MP4/IFRAME" = Real video feed available</li>
          <li>• Click "Enable AI Detection" on the webcam to start live monitoring</li>
          <li>• Green boxes show detected people or objects</li>
          <li>• Click fullscreen button to view videos in larger size</li>
          <li>• Go to "Camera Health" tab to turn cameras on/off</li>
        </ul>
      </div>
    </div>
  )
}
