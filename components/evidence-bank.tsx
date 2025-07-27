"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Play, Calendar } from "lucide-react"

const evidenceItems = [
  {
    id: "EV_001",
    title: "Person Detection - Main Entrance",
    camera: "CAM_MAIN_01",
    timestamp: "2024-01-27 18:35:44",
    duration: "00:02:15",
    size: "45.2 MB",
    type: "video",
    thumbnail: "/1.jpeg?height=200&width=300&text=Evidence+1",
  },
  {
    id: "EV_002",
    title: "Suspicious Activity - Hallway",
    camera: "CAM_HALL_03",
    timestamp: "2024-01-27 17:22:10",
    duration: "00:01:45",
    size: "32.8 MB",
    type: "video",
    thumbnail: "/2.jpeg?height=200&width=300&text=Evidence+2",
  },
  {
    id: "EV_003",
    title: "Restricted Area Breach",
    camera: "CAM_PARK_05",
    timestamp: "2024-01-27 16:15:33",
    duration: "00:03:20",
    size: "67.1 MB",
    type: "video",
    thumbnail: "/405797909-1602551343_jpeg_jpg.rf.efede0a955e573c3f7a45658763c35a2.jpg?height=200&width=300&text=Evidence+3",
  },
  {
    id: "EV_004",
    title: "Motion Alert - Cafeteria",
    camera: "CAM_CAFE_06",
    timestamp: "2024-01-27 15:45:12",
    duration: "00:01:30",
    size: "28.5 MB",
    type: "video",
    thumbnail: "/406123595-1602622914_jpg.rf.51acb9901c063cec3504d24e48c0846e.jpg?height=200&width=300&text=Evidence+4",
  },
  {
    id: "EV_005",
    title: "Face Detection - Lobby",
    camera: "CAM_LOBBY_02",
    timestamp: "2024-01-27 14:30:55",
    duration: "00:02:45",
    size: "52.3 MB",
    type: "video",
    thumbnail: "/placeholder.svg?height=200&width=300&text=Evidence+5",
  },
  {
    id: "EV_006",
    title: "Vehicle Detection - Parking",
    camera: "CAM_PARK_05",
    timestamp: "2024-01-27 13:20:18",
    duration: "00:04:10",
    size: "89.7 MB",
    type: "video",
    thumbnail: "/placeholder.svg?height=200&width=300&text=Evidence+6",
  },
]

export function EvidenceBank() {
  const handleDownload = (itemId: string) => {
    console.log("Downloading evidence:", itemId)
    // In a real app, this would trigger a download
  }

  const handlePlay = (itemId: string) => {
    console.log("Playing evidence:", itemId)
    // In a real app, this would open a video player
  }

  const handleBulkDownload = () => {
    console.log("Downloading all evidence")
    // In a real app, this would create a zip file
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Evidence Bank</h2>
          <p className="text-gray-400 mt-1">Download and manage recorded security footage</p>
        </div>
        <Button onClick={handleBulkDownload} className="bg-blue-600 hover:bg-blue-700 text-white">
          <Download className="h-4 w-4 mr-2" />
          Download All
        </Button>
      </div>

      {/* Evidence Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {evidenceItems.map((item) => (
          <Card key={item.id} className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-all duration-200">
            <CardHeader className="p-0">
              <div className="relative aspect-video bg-gray-900 rounded-t-lg overflow-hidden">
                <img
                  src={item.thumbnail || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                  <Button
                    onClick={() => handlePlay(item.id)}
                    size="sm"
                    className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                </div>
                <div className="absolute top-2 right-2">
                  <Badge className="bg-blue-600 text-white text-xs">{item.duration}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div>
                  <h3 className="text-white font-semibold text-sm mb-1">{item.title}</h3>
                  <p className="text-gray-400 text-xs">{item.camera}</p>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Calendar className="h-3 w-3" />
                  <span>{item.timestamp}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-xs">{item.size}</span>
                  <Button
                    onClick={() => handleDownload(item.id)}
                    size="sm"
                    className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1"
                  >
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Instructions */}
      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
        <h3 className="text-white font-semibold mb-2">How to Use Evidence Bank:</h3>
        <ul className="text-gray-300 text-sm space-y-1">
          <li>• Click "Preview" to watch a video before downloading</li>
          <li>• Click "Download" to save individual videos to your computer</li>
          <li>• Use "Download All" to get all evidence files at once</li>
          <li>• Videos are automatically saved when alerts are triggered</li>
        </ul>
      </div>
    </div>
  )
}
