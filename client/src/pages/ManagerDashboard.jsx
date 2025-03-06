"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAnalyticsOverview } from "../redux/slices/analyticsSlice"
import OrdersTable from "../components/OrdersTable"
import AnalyticsCharts from "../components/AnalyticsCharts"
import CreateOrderModal from "../components/CreateOrderModal"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

const ManagerDashboard = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const dispatch = useDispatch()
  const { overview, isLoading } = useSelector((state) => state.analytics)
  const { lowStockAlerts } = useSelector((state) => state.materials)

  useEffect(() => {
    dispatch(getAnalyticsOverview())
  }, [dispatch])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Manager Dashboard</h1>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Order
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Total Orders</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {isLoading ? "..." : overview.totalOrders || 0}
            </dd>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Orders In Production</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {isLoading ? "..." : overview.ordersByStatus?.find((s) => s._id === "In Production")?.count || 0}
            </dd>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Low Stock Materials</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">{lowStockAlerts.length}</dd>
          </div>
        </div>
      </div>

      {/* Analytics Charts */}
      <AnalyticsCharts />

      {/* Orders Table */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">Production Orders</h2>
        <OrdersTable isManager={true} />
      </div>

      {/* Create Order Modal */}
      <CreateOrderModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
    </div>
  )
}

export default ManagerDashboard

