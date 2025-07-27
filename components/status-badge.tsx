import { Badge } from "@/components/ui/badge"

interface StatusBadgeProps {
  status: "live" | "warning" | "offline"
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "live":
        return {
          className: "bg-green-600 text-white",
          text: "LIVE",
        }
      case "warning":
        return {
          className: "bg-yellow-600 text-white",
          text: "WARNING",
        }
      case "offline":
        return {
          className: "bg-red-600 text-white",
          text: "OFFLINE",
        }
      default:
        return {
          className: "bg-gray-600 text-white",
          text: "UNKNOWN",
        }
    }
  }

  const config = getStatusConfig(status)

  return <Badge className={config.className}>{config.text}</Badge>
}
