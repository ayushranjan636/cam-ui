import { EnhancedCameraCard } from "@/components/enhanced-camera-card"

const cameras = [
  {
    id: "CAM_MAIN_01",
    location: "Main Entrance",
    status: "live" as const,
    timestamp: "22:20:16",
    image: "/placeholder.svg?height=200&width=300",
    detections: [],
    isWebcam: true, // This camera will use webcam
  },
  {
    id: "CAM_LOBBY_02",
    location: "Reception Lobby",
    status: "live" as const,
    timestamp: "22:20:16",
    image: "/placeholder.svg?height=200&width=300",
    detections: [],
  },
  {
    id: "CAM_HALL_03",
    location: "Main Hallway",
    status: "live" as const,
    timestamp: "22:20:16",
    image: "/placeholder.svg?height=200&width=300",
    detections: [{ type: "Person", confidence: 94 }],
  },
  {
    id: "CAM_LAB_04",
    location: "Computer Lab",
    status: "warning" as const,
    timestamp: "22:20:16",
    image: "/placeholder.svg?height=200&width=300",
    detections: [],
  },
  {
    id: "CAM_PARK_05",
    location: "Parking Lot",
    status: "live" as const,
    timestamp: "22:20:16",
    image: "/placeholder.svg?height=200&width=300",
    detections: [{ type: "Person", confidence: 94 }],
  },
  {
    id: "CAM_CAFE_06",
    location: "Cafeteria",
    status: "live" as const,
    timestamp: "22:20:16",
    image: "/placeholder.svg?height=200&width=300",
    detections: [],
  },
  {
    id: "CAM_LIB_07",
    location: "Library",
    status: "offline" as const,
    timestamp: "22:20:16",
    image: "/placeholder.svg?height=200&width=300",
    detections: [],
  },
  {
    id: "CAM_GYM_08",
    location: "Gymnasium",
    status: "live" as const,
    timestamp: "22:20:16",
    image: "/placeholder.svg?height=200&width=300",
    detections: [],
  },
]

export function LiveMonitor() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Live Monitor
        </h2>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2 bg-green-600/20 text-green-400 px-3 py-1 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>8 Cameras Active</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cameras.map((camera) => (
          <EnhancedCameraCard key={camera.id} camera={camera} />
        ))}
      </div>
    </div>
  )
}
