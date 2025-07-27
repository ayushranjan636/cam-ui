import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/status-badge"
import { Camera, Clock, ToggleLeft, ToggleRight } from "lucide-react"

const cameraHealthData = [
  {
    id: "CAM_MAIN_01",
    location: "Main Entrance",
    status: "live" as const,
    health: "Healthy",
    lastChecked: "2s ago",
    uptime: "99.8%",
    enabled: true,
  },
  {
    id: "CAM_LOBBY_02",
    location: "Reception Lobby",
    status: "live" as const,
    health: "Healthy",
    lastChecked: "3s ago",
    uptime: "99.5%",
    enabled: true,
  },
  {
    id: "CAM_HALL_03",
    location: "Main Hallway",
    status: "live" as const,
    health: "Healthy",
    lastChecked: "1s ago",
    uptime: "99.9%",
    enabled: true,
  },
  {
    id: "CAM_LAB_04",
    location: "Computer Lab",
    status: "warning" as const,
    health: "Blurred",
    lastChecked: "5s ago",
    uptime: "97.2%",
    enabled: true,
  },
  {
    id: "CAM_PARK_05",
    location: "Parking Lot",
    status: "live" as const,
    health: "Healthy",
    lastChecked: "2s ago",
    uptime: "99.1%",
    enabled: true,
  },
  {
    id: "CAM_CAFE_06",
    location: "Cafeteria",
    status: "live" as const,
    health: "Healthy",
    lastChecked: "4s ago",
    uptime: "98.8%",
    enabled: true,
  },
  {
    id: "CAM_LIB_07",
    location: "Library",
    status: "offline" as const,
    health: "Offline",
    lastChecked: "2m ago",
    uptime: "85.3%",
    enabled: false,
  },
  {
    id: "CAM_GYM_08",
    location: "Gymnasium",
    status: "live" as const,
    health: "Healthy",
    lastChecked: "1s ago",
    uptime: "99.7%",
    enabled: true,
  },
]

export function CameraHealth() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Camera Health</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {cameraHealthData.map((camera) => (
          <div key={camera.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-gray-400" />
                <span className="font-semibold text-white">{camera.id}</span>
              </div>
              <StatusBadge status={camera.status} />
            </div>

            <div className="text-gray-400 text-sm mb-3">{camera.location}</div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Health:</span>
                <span
                  className={`text-sm font-semibold ${
                    camera.health === "Healthy"
                      ? "text-green-500"
                      : camera.health === "Blurred"
                        ? "text-yellow-500"
                        : "text-red-500"
                  }`}
                >
                  {camera.health}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Uptime:</span>
                <span className="text-white text-sm">{camera.uptime}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Last Checked:</span>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-gray-400" />
                  <span className="text-white text-sm">{camera.lastChecked}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-700">
              <span className="text-gray-400 text-sm">Enable Camera</span>
              <Button variant="ghost" size="sm" className="p-0 h-auto">
                {camera.enabled ? (
                  <ToggleRight className="h-6 w-6 text-green-500" />
                ) : (
                  <ToggleLeft className="h-6 w-6 text-gray-500" />
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
