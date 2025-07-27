"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Settings, Lock } from "lucide-react"

export function AITuning() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">AI Settings</h2>
        <p className="text-gray-400 mt-1">Configure AI detection parameters and models</p>
      </div>

      {/* Coming Soon Card */}
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-12 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
              <Lock className="h-8 w-8 text-gray-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">AI Tuning Coming Soon</h3>
              <p className="text-gray-400 max-w-md">
                Advanced AI configuration tools are currently in development. This feature will allow you to:
              </p>
            </div>
            <div className="text-left text-gray-300 text-sm space-y-2 max-w-md">
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4 text-blue-400" />
                <span>Adjust detection sensitivity levels</span>
              </div>
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4 text-blue-400" />
                <span>Configure object recognition models</span>
              </div>
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4 text-blue-400" />
                <span>Set custom alert thresholds</span>
              </div>
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4 text-blue-400" />
                <span>Train custom detection models</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
