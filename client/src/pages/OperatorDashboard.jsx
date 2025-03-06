import { useSelector } from "react-redux"
import OrdersTable from "../components/OrdersTable"

const OperatorDashboard = () => {
  const { orders } = useSelector((state) => state.orders)
  const { materials } = useSelector((state) => state.materials)

  // Count active orders (not completed)
  const activeOrders = orders.filter((order) => order.status !== "Completed").length

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Operator Dashboard</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Active Orders</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">{activeOrders}</dd>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Materials to Monitor</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">{materials.length}</dd>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">Production Orders</h2>
        <OrdersTable isManager={false} />
      </div>
    </div>
  )
}

export default OperatorDashboard

