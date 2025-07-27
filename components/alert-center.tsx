"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, CheckCircle, AlertTriangle } from "lucide-react"

interface Alert {
  id: string
  type: string
  message: string
  location: string
  timestamp: string
  status: "active" | "acknowledged"
  confidence: number
  priority: "high" | "medium" | "low"
}

interface AlertCenterProps {
  alerts: Alert[]
}

export function AlertCenter({ alerts }: AlertCenterProps) {
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(alerts[0] || null)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredAlerts = alerts.filter(
    (alert) =>
      alert.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAcknowledge = (alertId: string) => {
    console.log("Acknowledged alert:", alertId)
    // In a real app, this would update the alert status
  }

  const handleEscalate = (alertId: string) => {
    console.log("Escalated alert:", alertId)
    // In a real app, this would escalate the alert
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-600"
      case "medium":
        return "bg-yellow-600"
      case "low":
        return "bg-blue-600"
      default:
        return "bg-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">Security Alerts</h2>
        <p className="text-gray-400 mt-1">Monitor and respond to security events</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel - Alert List */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              Active Alerts
              <Badge className="bg-red-600 text-white">
                {filteredAlerts.filter((a) => a.status === "active").length}
              </Badge>
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search alerts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-700 border-gray-600 text-white"
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-2 max-h-96 overflow-y-auto">
            {filteredAlerts.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                <AlertTriangle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No alerts found</p>
              </div>
            ) : (
              filteredAlerts.map((alert) => (
                <div
                  key={alert.id}
                  onClick={() => setSelectedAlert(alert)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                    selectedAlert?.id === alert.id
                      ? "bg-blue-600/20 border-blue-500"
                      : "bg-gray-700 border-gray-600 hover:bg-gray-600"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-1 h-full ${getPriorityColor(alert.priority)} rounded-full`}></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-red-400 text-sm font-semibold uppercase">{alert.priority} Priority</span>
                        <span className="text-gray-400 text-xs">{alert.timestamp}</span>
                      </div>
                      <h4 className="text-white font-medium mb-1">{alert.type}</h4>
                      <p className="text-gray-300 text-sm mb-2">{alert.message}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-xs">{alert.location}</span>
                        <Badge variant={alert.status === "active" ? "destructive" : "secondary"} className="text-xs">
                          {alert.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Right Panel - Alert Details */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Alert Details</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedAlert ? (
              <div className="space-y-6">
                {/* Alert Image/Preview */}
                <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
                  <img
                    src="/placeholder.svg?height=300&width=500&text=Security+Camera+Feed"
                    alt="Alert preview"
                    className="w-full h-full object-cover"
                  />
                  {/* Detection overlay */}
                  <div className="absolute top-4 left-4 bg-red-600 text-white px-2 py-1 rounded text-sm font-semibold">
                    Person: {selectedAlert.confidence}%
                  </div>
                  {/* Detection box */}
                  <div
                    className="absolute border-2 border-red-400 bg-red-400/20"
                    style={{
                      left: "30%",
                      top: "25%",
                      width: "25%",
                      height: "40%",
                    }}
                  ></div>
                </div>

                {/* Alert Information */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-gray-400 text-sm mb-1">Incident Type</h4>
                    <p className="text-white font-semibold">{selectedAlert.type}</p>
                  </div>
                  <div>
                    <h4 className="text-gray-400 text-sm mb-1">Location</h4>
                    <p className="text-white font-semibold">{selectedAlert.location}</p>
                  </div>
                  <div>
                    <h4 className="text-gray-400 text-sm mb-1">Confidence</h4>
                    <p className="text-white font-semibold">{selectedAlert.confidence}%</p>
                  </div>
                  <div>
                    <h4 className="text-gray-400 text-sm mb-1">First Detected</h4>
                    <p className="text-white font-semibold">{selectedAlert.timestamp}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    onClick={() => handleAcknowledge(selectedAlert.id)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Acknowledge
                  </Button>
                  <Button
                    onClick={() => handleEscalate(selectedAlert.id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                  >
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Escalate
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400 py-12">
                <AlertTriangle className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Select an alert to view details</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Instructions */}
      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
        <h3 className="text-white font-semibold mb-2">How to Handle Alerts:</h3>
        <ul className="text-gray-300 text-sm space-y-1">
          <li>• Red alerts are high priority - respond immediately</li>
          <li>• Click on any alert to see camera footage and details</li>
          <li>• Use "Acknowledge" when you've seen the alert</li>
          <li>• Use "Escalate" to notify security team or authorities</li>
        </ul>
      </div>
    </div>
  )
}
