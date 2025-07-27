import { StatusBadge } from "@/components/status-badge"
import { WifiOff } from "lucide-react"

interface Detection {
  type: string
  confidence: number
}

interface Camera {
  id: string
  location: string
  status: "live" | "warning" | "offline"
  timestamp: string
  image: string
  detections: Detection[]
}

interface CameraCardProps {
  camera: Camera
}

export function CameraCard({ camera }: CameraCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700">
      {/* Header */}
      <div className="flex justify-between items-center p-3 bg-gray-900">
        <StatusBadge status={camera.status} />
        <span className="text-gray-400 text-sm font-mono">{camera.timestamp}</span>
      </div>

      {/* Video/Image Area */}
      <div className="relative aspect-video bg-gray-900">
        {camera.status === "offline" ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900">
            <WifiOff className="h-8 w-8 text-red-500 mb-2" />
            <span className="text-red-500 font-semibold">Connection Lost</span>
            <span className="text-gray-400 text-sm">Attempting reconnection...</span>
          </div>
        ) : (
          <>
            <img
              src={camera.image || "/placeholder.svg"}
              alt={`${camera.id} feed`}
              className="w-full h-full object-cover"
            />
            {/* Detection Overlays */}
            {camera.detections.map((detection, index) => (
              <div
                key={index}
                className="absolute top-4 right-4 bg-green-600 text-white px-2 py-1 rounded text-xs font-semibold"
              >
                {detection.type}: {detection.confidence}%
              </div>
            ))}
          </>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 bg-gray-800">
        <div className="font-semibold text-white">{camera.id}</div>
        <div className="text-gray-400 text-sm">{camera.location}</div>
      </div>
    </div>
  )
}
