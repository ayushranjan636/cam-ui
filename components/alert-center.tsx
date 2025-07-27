"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Check, AlertTriangle } from "lucide-react"

const alerts = [
  {
    id: 1,
    priority: "HIGH PRIORITY",
    description: "person detected",
    location: "Main Entrance",
    timestamp: "18:35:44",
    type: "RESTRICTED AREA BREACH",
    confidence: 92,
    image: "/placeholder.svg?height=400&width=600",
    firstDetected: "18:35:44",
  },
  {
    id: 2,
    priority: "HIGH PRIORITY",
    description: "suspicious activity",
    location: "Main Hallway",
    timestamp: "18:35:44",
    type: "SUSPICIOUS BEHAVIOR",
    confidence: 87,
    image: "/placeholder.svg?height=400&width=600",
    firstDetected: "18:35:44",
  },
  {
    id: 3,
    priority: "HIGH PRIORITY",
    description: "restricted area breach",
    location: "Parking Lot",
    timestamp: "18:35:44",
    type: "RESTRICTED AREA BREACH",
    confidence: 95,
    image: "/placeholder.svg?height=400&width=600",
    firstDetected: "18:35:44",
  },
  {
    id: 4,
    priority: "HIGH PRIORITY",
    description: "camera fault",
    location: "Library",
    timestamp: "18:35:44",
    type: "SYSTEM FAULT",
    confidence: 100,
    image: "/placeholder.svg?height=400&width=600",
    firstDetected: "18:35:44",
  },
]

export function AlertCenter() {
  const [selectedAlert, setSelectedAlert] = useState(alerts[0])
  const [searchTerm, setSearchTerm] = useState("")

  const filteredAlerts = alerts.filter(
    (alert) =>
      alert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Alert Center</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Active Alerts */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Active Alerts</h3>
              <span className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                {filteredAlerts.length}
              </span>
            </div>

            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Filter alerts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>

            <div className="space-y-2">
              {filteredAlerts.map((alert) => (
                <div
                  key={alert.id}
                  onClick={() => setSelectedAlert(alert)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors border-l-4 ${
                    selectedAlert.id === alert.id
                      ? "bg-gray-700 border-l-red-500"
                      : "bg-gray-900 border-l-red-600 hover:bg-gray-700"
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-red-400 text-xs font-semibold">{alert.priority}</span>
                    <span className="text-gray-400 text-xs">{alert.timestamp}</span>
                  </div>
                  <div className="text-white font-medium">{alert.description}</div>
                  <div className="text-gray-400 text-sm">{alert.location}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Alert Details */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Alert Details</h3>

            {/* Alert Image */}
            <div className="relative mb-4 rounded-lg overflow-hidden">
              <img
                src={selectedAlert.image || "/placeholder.svg"}
                alt="Alert preview"
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-4 left-4 bg-red-600 text-white px-2 py-1 rounded text-sm font-semibold">
                Person: 96%
              </div>
            </div>

            {/* Alert Information */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <div className="text-gray-400 text-sm mb-1">Incident Type</div>
                <div className="text-white font-semibold">{selectedAlert.type}</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm mb-1">Location</div>
                <div className="text-white font-semibold">{selectedAlert.location}</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm mb-1">Confidence</div>
                <div className="text-white font-semibold">{selectedAlert.confidence}%</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm mb-1">First Detected</div>
                <div className="text-white font-semibold">{selectedAlert.firstDetected}</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                <Check className="h-4 w-4 mr-2" />
                Acknowledge
              </Button>
              <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Escalate
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
