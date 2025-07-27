import { Button } from "@/components/ui/button"
import { AlertTriangle, Users, Package, Shield, Zap } from "lucide-react"

export function TopNavbar() {
  return (
    <nav className="glass-effect border-b border-gray-700/50 px-6 py-4 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        {/* Enhanced Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-300 bg-clip-text text-transparent tracking-wider">
            NETRA AI
          </h1>
        </div>

        {/* Enhanced System Stats */}
        <div className="flex items-center gap-8 text-sm">
          <div className="flex items-center gap-4 bg-gray-800/50 px-4 py-2 rounded-lg backdrop-blur-sm">
            <span className="text-gray-300 font-medium">System Status:</span>
            <span className="text-white font-semibold">8 Total</span>
            <span className="text-green-400 font-semibold flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>6 Online
            </span>
            <span className="text-yellow-400 font-semibold flex items-center gap-1">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>1 Warning
            </span>
            <span className="text-red-400 font-semibold flex items-center gap-1">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>1 Offline
            </span>
          </div>

          <div className="flex items-center gap-4 bg-gray-800/50 px-4 py-2 rounded-lg backdrop-blur-sm">
            <span className="text-gray-300 font-medium">Detection Stats:</span>
            <div className="flex items-center gap-1 text-blue-400 font-semibold">
              <Users className="h-4 w-4" />
              <span>47 People</span>
            </div>
            <div className="flex items-center gap-1 text-purple-400 font-semibold">
              <Package className="h-4 w-4" />
              <span>12 Bags</span>
            </div>
            <div className="flex items-center gap-1 text-orange-400 font-semibold">
              <AlertTriangle className="h-4 w-4" />
              <span>4 Alerts</span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-green-600/20 px-4 py-2 rounded-lg backdrop-blur-sm">
            <Shield className="h-4 w-4 text-green-400" />
            <span className="text-green-400 font-semibold">99.2% System Health</span>
          </div>
        </div>

        {/* Enhanced Emergency Button */}
        <Button className="btn-glow bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold px-8 py-3 text-lg shadow-lg">
          <AlertTriangle className="h-5 w-5 mr-2 animate-pulse" />
          EMERGENCY
        </Button>
      </div>
    </nav>
  )
}
