"use client"

import { Monitor, AlertTriangle, Archive, Camera, Settings, Wifi, BarChart3 } from "lucide-react"
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
    title: "Live Cameras",
    description: "Watch all cameras",
    icon: Monitor,
    disabled: false,
    color: "text-blue-400",
  },
  {
    id: "alert-center",
    title: "Alerts",
    description: "View security alerts",
    icon: AlertTriangle,
    disabled: false,
    color: "text-red-400",
  },
  {
    id: "evidence-bank",
    title: "Saved Videos",
    description: "Download recordings",
    icon: Archive,
    disabled: false,
    color: "text-purple-400",
  },
  {
    id: "camera-health",
    title: "Camera Status",
    description: "Check camera health",
    icon: Camera,
    disabled: false,
    color: "text-green-400",
  },
  {
    id: "analytics",
    title: "Reports",
    description: "View statistics",
    icon: BarChart3,
    disabled: false,
    color: "text-yellow-400",
  },
  {
    id: "ai-tuning",
    title: "AI Settings",
    description: "Coming soon",
    icon: Settings,
    disabled: true,
    color: "text-gray-500",
  },
]

export function AppSidebar({ activeTab, setActiveTab, alertCount = 0 }: AppSidebarProps) {
  return (
    <Sidebar className="border-r border-gray-700">
      <SidebarContent className="bg-gray-800">
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
                      relative transition-all duration-200 rounded-lg p-4 h-auto
                      ${
                        activeTab === item.id
                          ? "bg-blue-600 text-white shadow-lg"
                          : "text-gray-300 hover:text-white hover:bg-gray-700"
                      }
                      ${item.disabled ? "opacity-50 cursor-not-allowed" : ""}
                    `}
                    title={item.disabled ? item.description : undefined}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <item.icon className={`h-5 w-5 ${activeTab === item.id ? "text-white" : item.color}`} />
                      <div className="flex-1 text-left">
                        <div className="font-medium">{item.title}</div>
                        <div className="text-xs opacity-75">{item.description}</div>
                      </div>
                      {item.id === "alert-center" && alertCount > 0 && (
                        <Badge className="bg-red-600 text-white text-xs px-2 py-1">{alertCount}</Badge>
                      )}
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-gray-800 border-t border-gray-700 p-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Wifi className="h-4 w-4 text-green-400" />
            <span className="text-green-400 font-medium">System Online</span>
          </div>
          <div className="text-xs text-gray-400">Last check: 2 seconds ago</div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: "85%" }}></div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
