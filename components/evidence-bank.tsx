import { Button } from "@/components/ui/button"
import { Download, Calendar, Camera } from "lucide-react"

const evidenceItems = [
  {
    id: 1,
    thumbnail: "/placeholder.svg?height=150&width=200",
    cameraName: "CAM_MAIN_01",
    timestamp: "2024-01-27 18:35:44",
    type: "Person Detection",
    size: "2.4 MB",
  },
  {
    id: 2,
    thumbnail: "/placeholder.svg?height=150&width=200",
    cameraName: "CAM_HALL_03",
    timestamp: "2024-01-27 17:22:15",
    type: "Suspicious Activity",
    size: "3.1 MB",
  },
  {
    id: 3,
    thumbnail: "/placeholder.svg?height=150&width=200",
    cameraName: "CAM_PARK_05",
    timestamp: "2024-01-27 16:45:32",
    type: "Area Breach",
    size: "1.8 MB",
  },
  {
    id: 4,
    thumbnail: "/placeholder.svg?height=150&width=200",
    cameraName: "CAM_LOBBY_02",
    timestamp: "2024-01-27 15:18:09",
    type: "Object Detection",
    size: "2.7 MB",
  },
  {
    id: 5,
    thumbnail: "/placeholder.svg?height=150&width=200",
    cameraName: "CAM_CAFE_06",
    timestamp: "2024-01-27 14:33:21",
    type: "Motion Alert",
    size: "1.9 MB",
  },
  {
    id: 6,
    thumbnail: "/placeholder.svg?height=150&width=200",
    cameraName: "CAM_GYM_08",
    timestamp: "2024-01-27 13:55:47",
    type: "Face Detection",
    size: "2.2 MB",
  },
]

export function EvidenceBank() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Evidence Bank</h2>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Download className="h-4 w-4 mr-2" />
          Download All
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {evidenceItems.map((item) => (
          <div key={item.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700">
            <div className="relative">
              <img
                src={item.thumbnail || "/placeholder.svg"}
                alt={`Evidence ${item.id}`}
                className="w-full h-40 object-cover"
              />
              <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                {item.size}
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Camera className="h-4 w-4 text-gray-400" />
                <span className="text-white font-semibold">{item.cameraName}</span>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400 text-sm">{item.timestamp}</span>
              </div>

              <div className="text-blue-400 text-sm mb-3">{item.type}</div>

              <Button className="w-full bg-gray-700 hover:bg-gray-600 text-white">
                <Download className="h-4 w-4 mr-2" />
                Download Pack
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
