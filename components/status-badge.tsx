"use client"

import { Badge } from "@/components/ui/badge"

interface StatusBadgeProps {
  status: "live" | "warning" | "offline"
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusConfig = () => {
    switch (status) {
      case "live":
        return {
          text: "LIVE",
          className: "bg-green-600 text-white border-green-600",
        }
      case "warning":
        return {
          text: "WARNING",
          className: "bg-yellow-600 text-white border-yellow-600",
        }
      case "offline":
        return {
          text: "OFFLINE",
          className: "bg-red-600 text-white border-red-600",
        }
      default:
        return {
          text: "UNKNOWN",
          className: "bg-gray-600 text-white border-gray-600",
        }
    }
  }

  const config = getStatusConfig()

  return <Badge className={`${config.className} text-xs font-semibold px-2 py-1`}>{config.text}</Badge>
}
