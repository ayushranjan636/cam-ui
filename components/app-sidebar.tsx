"use client"

import { Monitor, AlertTriangle, Archive, Camera, Settings, Wifi, Activity } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

interface AppSidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  alertCount?: number
}

const menuItems = [
  {
    id: "live-monitor",
    title: "Live Monitor",
    icon: Monitor,
    disabled: false,
    color: "text-blue-400",
  },
  {
    id: "alert-center",
    title: "Alert Center",
    icon: AlertTriangle,
    disabled: false,
    color: "text-red-400",
  },
  {
    id: "evidence-bank",
    title: "Evidence Bank",
    icon: Archive,
    disabled: false,
    color: "text-purple-400",
  },
  {
    id: "camera-health",
    title: "Camera Health",
    icon: Camera,
    disabled: false,
    color: "text-green-400",
  },
  {
    id: "analytics",
    title: "Analytics",
    icon: Activity,
    disabled: false,
    color: "text-yellow-400",
  },
  {
    id: "ai-tuning",
    title: "AI Tuning",
    icon: Settings,
    disabled: true,
    color: "text-gray-500",
  },
]

export function AppSidebar({ activeTab, setActiveTab, alertCount = 5 }: AppSidebarProps) {
  return (
    <Sidebar className="border-r border-gray-700/50">
      <SidebarContent className="glass-effect">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2 p-4">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => !item.disabled && setActiveTab(item.id)}
                    isActive={activeTab === item.id}
                    disabled={item.disabled}
                    className={`
                      relative overflow-hidden transition-all duration-300 rounded-xl p-4 h-auto
                      ${
                        activeTab === item.id
                          ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white border border-blue-500/30 shadow-lg"
                          : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                      }
                      ${item.disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}
                    `}
                    title={item.disabled ? "Coming soon..." : undefined}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <item.icon className={`h-5 w-5 ${activeTab === item.id ? "text-blue-400" : item.color}`} />
                      <span className="font-medium">{item.title}</span>
                      {item.id === "alert-center" && alertCount > 0 && (
                        <Badge className="ml-auto bg-red-600 text-white text-xs px-1 min-w-[1.25rem] h-5">
                          {alertCount}
                        </Badge>
                      )}
                      {activeTab === item.id && (
                        <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      )}
                    </div>
                    {activeTab === item.id && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-transparent rounded-xl"></div>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="glass-effect border-t border-gray-700/50 p-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-2 text-green-400">
              <Wifi className="h-4 w-4 animate-pulse" />
              <span className="font-medium">System Online</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-gray-400">
            <Activity className="h-3 w-3" />
            <span>Last check: 2s ago</span>
          </div>

          <div className="w-full bg-gray-700 rounded-full h-1">
            <div
              className="bg-gradient-to-r from-green-500 to-blue-500 h-1 rounded-full animate-pulse"
              style={{ width: "85%" }}
            ></div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
