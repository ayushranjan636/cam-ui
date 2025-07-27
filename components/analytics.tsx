"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Activity, Users, AlertTriangle, Camera, Cpu, HardDrive } from "lucide-react"

interface AnalyticsProps {
  systemStats: any
  cameras: any[]
  alerts: any[]
}

export function Analytics({ systemStats, cameras, alerts }: AnalyticsProps) {
  const activeAlerts = alerts.filter((alert) => alert.status === "active").length
  const avgConfidence = alerts.reduce((sum, alert) => sum + alert.confidence, 0) / alerts.length || 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">System Reports</h2>
        <p className="text-gray-400 mt-1">View system performance and security statistics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Total Detections</CardTitle>
            <Users className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{systemStats.peopleDetected + systemStats.bagsDetected}</div>
            <div className="flex items-center text-xs text-green-400">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12% from yesterday
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{activeAlerts}</div>
            <div className="flex items-center text-xs text-red-400">
              <TrendingUp className="h-3 w-3 mr-1" />
              +2 new alerts
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">System Health</CardTitle>
            <Camera className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{systemStats.systemHealth}%</div>
            <div className="flex items-center text-xs text-green-400">
              <TrendingUp className="h-3 w-3 mr-1" />
              Excellent
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Avg Confidence</CardTitle>
            <Activity className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{avgConfidence.toFixed(1)}%</div>
            <div className="flex items-center text-xs text-green-400">
              <TrendingUp className="h-3 w-3 mr-1" />
              High accuracy
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Resources */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">System Performance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cpu className="h-4 w-4 text-blue-400" />
                <span className="text-sm text-gray-300">CPU Usage</span>
              </div>
              <span className="text-sm font-medium text-white">{systemStats.cpuUsage}%</span>
            </div>
            <Progress value={systemStats.cpuUsage} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HardDrive className="h-4 w-4 text-green-400" />
                <span className="text-sm text-gray-300">Memory Usage</span>
              </div>
              <span className="text-sm font-medium text-white">{systemStats.memoryUsage}%</span>
            </div>
            <Progress value={systemStats.memoryUsage} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-yellow-400" />
                <span className="text-sm text-gray-300">Network Speed</span>
              </div>
              <span className="text-sm font-medium text-white">{systemStats.networkLatency}ms</span>
            </div>
            <Progress value={(systemStats.networkLatency / 50) * 100} className="h-2" />
          </div>

          <div className="pt-4 border-t border-gray-700">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-300">System Uptime</span>
              <span className="text-green-400 font-medium">{systemStats.uptime}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Camera Performance */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Camera Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {cameras.map((camera) => (
              <div key={camera.id} className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-white text-sm">{camera.id}</span>
                  <Badge
                    className={`text-xs ${
                      camera.status === "live"
                        ? "bg-green-600"
                        : camera.status === "warning"
                          ? "bg-yellow-600"
                          : "bg-red-600"
                    } text-white`}
                  >
                    {camera.status.toUpperCase()}
                  </Badge>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Quality:</span>
                    <span className="text-white">{camera.fps} FPS</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Uptime:</span>
                    <span className="text-green-400">{camera.uptime}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Temperature:</span>
                    <span className={camera.temperature > 50 ? "text-red-400" : "text-green-400"}>
                      {camera.temperature}°C
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
        <h3 className="text-white font-semibold mb-2">Understanding Reports:</h3>
        <ul className="text-gray-300 text-sm space-y-1">
          <li>• Green numbers = Good performance</li>
          <li>• Yellow/Red numbers = Need attention</li>
          <li>• Higher percentages are better for uptime and health</li>
          <li>• Lower numbers are better for network speed (latency)</li>
        </ul>
      </div>
    </div>
  )
}
