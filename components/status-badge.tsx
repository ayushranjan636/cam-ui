interface StatusBadgeProps {
  status: "live" | "warning" | "offline"
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "live":
        return { color: "bg-green-600", text: "LIVE" }
      case "warning":
        return { color: "bg-yellow-600", text: "WARNING" }
      case "offline":
        return { color: "bg-red-600", text: "OFFLINE" }
      default:
        return { color: "bg-gray-600", text: "UNKNOWN" }
    }
  }

  const config = getStatusConfig(status)

  return <span className={`${config.color} text-white px-2 py-1 rounded text-xs font-semibold`}>{config.text}</span>
}
