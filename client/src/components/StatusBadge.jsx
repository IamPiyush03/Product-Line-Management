import { cn } from "@/lib/utils"

const StatusBadge = ({ status }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Planned":
        return "bg-gray-100 text-gray-800"
      case "In Production":
        return "bg-blue-100 text-blue-800"
      case "Quality Check":
        return "bg-yellow-100 text-yellow-800"
      case "Completed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <span
      className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", getStatusColor(status))}
    >
      {status}
    </span>
  )
}

export default StatusBadge

