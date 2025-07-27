"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts"
import { TrendingUp, Activity, Users, AlertTriangle, Camera, Cpu, HardDrive } from "lucide-react"

const hourlyData = [
  { hour: "00:00", detections: 12, alerts: 2 },
  { hour: "04:00", detections: 8, alerts: 1 },
  { hour: "08:00", detections: 45, alerts: 5 },
  { hour: "12:00", detections: 67, alerts: 8 },
  { hour: "16:00", detections: 89, alerts: 12 },
  { hour: "20:00", detections: 34, alerts: 4 },
]

const detectionTypes = [
  { name: "Person", value: 65, color: "#3b82f6" },
  { name: "Vehicle", value: 20, color: "#10b981" },
  { name: "Bag", value: 10, color: "#f59e0b" },
  { name: "Face", value: 5, color: "#ef4444" },
]

const performanceData = [
  { time: "10:00", cpu: 45, memory: 67, network: 12 },
  { time: "10:05", cpu: 52, memory: 71, network: 15 },
  { time: "10:10", cpu: 48, memory: 69, network: 11 },
  { time: "10:15", cpu: 55, memory: 73, network: 18 },
  { time: "10:20", cpu: 43, memory: 65, network: 9 },
  { time: "10:25", cpu: 49, memory: 68, network: 13 },
]

interface AnalyticsProps {
  systemStats: any
  cameras: any[]
  alerts: any[]
}

export function Analytics({ systemStats, cameras, alerts }: AnalyticsProps) {
  const activeAlerts = alerts.filter((alert) => alert.status === "active").length
  const acknowledgedAlerts = alerts.filter((alert) => alert.status === "acknowledged").length
  const avgConfidence = alerts.reduce((sum, alert) => sum + alert.confidence, 0) / alerts.length || 0

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Analytics Dashboard
        </h2>
        <Badge variant="outline" className="text-green-400 border-green-400">
          <Activity className="h-4 w-4 mr-1" />
          Real-time Data
        </Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass-effect border-gray-700/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Total Detections</CardTitle>
            <Users className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{systemStats.peopleDetected + systemStats.bagsDetected}</div>
            <div className="flex items-center text-xs text-green-400">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12% from last hour
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-gray-700/50">
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

        <Card className="glass-effect border-gray-700/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Camera Uptime</CardTitle>
            <Camera className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{systemStats.systemHealth}%</div>
            <div className="flex items-center text-xs text-green-400">
              <TrendingUp className="h-3 w-3 mr-1" />
              Excellent performance
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-gray-700/50">
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

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hourly Activity */}
        <Card className="glass-effect border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white">Hourly Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="hour" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="detections"
                  stackId="1"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.3}
                />
                <Area type="monotone" dataKey="alerts" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Detection Types */}
        <Card className="glass-effect border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white">Detection Types</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={detectionTypes}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {detectionTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* System Performance */}
        <Card className="glass-effect border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white">System Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                  }}
                />
                <Line type="monotone" dataKey="cpu" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="memory" stroke="#10b981" strokeWidth={2} />
                <Line type="monotone" dataKey="network" stroke="#f59e0b" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* System Resources */}
        <Card className="glass-effect border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white">System Resources</CardTitle>
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
                  <span className="text-sm text-gray-300">Network Latency</span>
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
      </div>

      {/* Camera Status Grid */}
      <Card className="glass-effect border-gray-700/50">
        <CardHeader>
          <CardTitle className="text-white">Camera Performance Matrix</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {cameras.map((camera) => (
              <div key={camera.id} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-white">{camera.id}</span>
                  <Badge
                    variant={
                      camera.status === "live" ? "default" : camera.status === "warning" ? "secondary" : "destructive"
                    }
                    className="text-xs"
                  >
                    {camera.status.toUpperCase()}
                  </Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">FPS:</span>
                    <span className="text-white">{camera.fps}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Uptime:</span>
                    <span className="text-green-400">{camera.uptime}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Temp:</span>
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
    </div>
  )
}
