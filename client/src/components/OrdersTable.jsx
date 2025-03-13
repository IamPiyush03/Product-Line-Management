"use client"

import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setFilters, setPage, setSort, deleteOrder } from "../redux/slices/ordersSlice"
import StatusBadge from "./StatusBadge"
import PriorityBadge from "./PriorityBadge"
import { Button } from "@/components/ui/button"
import { Trash2, Edit, ChevronUp, ChevronDown } from "lucide-react"
import UpdateOrderStatusModal from "./UpdateOrderStatusModal"

const OrdersTable = ({ isManager = false }) => {
  const dispatch = useDispatch()
  const { orders, isLoading, filters, pagination, sort } = useSelector((state) => state.orders)
  const { workstations } = useSelector((state) => state.workstations)

  const [selectedOrder, setSelectedOrder] = useState(null)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)

  // Apply filters
  const handleFilterChange = (e) => {
    const { name, value } = e.target
    dispatch(setFilters({ [name]: value }))
  }

  // Handle sorting
  const handleSort = (field) => {
    const direction = sort.field === field && sort.direction === "asc" ? "desc" : "asc"
    dispatch(setSort({ field, direction }))
  }

  // Handle pagination
  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage))
  }

  // Handle delete order
  const handleDeleteOrder = (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      dispatch(deleteOrder(id))
    }
  }

  // Open update status modal
  const openUpdateModal = (order) => {
    setSelectedOrder(order)
    setIsUpdateModalOpen(true)
  }

  // Calculate if an order is overdue
  const isOverdue = (endDate) => {
    if (!endDate) return false
    return new Date(endDate) < new Date()
  }

  // Get sorted and paginated orders with null checks
  const getSortedOrders = () => {
    if (!orders || orders.length === 0) return []
    
    const startIndex = (pagination.page - 1) * pagination.limit
    const endIndex = startIndex + pagination.limit

    // Sort orders with null checks
    const sortedOrders = [...orders].sort((a, b) => {
      if (!a || !b) return 0
      
      if (sort.field === "createdAt") {
        return sort.direction === "asc"
          ? new Date(a.createdAt || 0) - new Date(b.createdAt || 0)
          : new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      }

      const aValue = a[sort.field] || ''
      const bValue = b[sort.field] || ''

      if (sort.direction === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    return sortedOrders.slice(startIndex, endIndex)
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      {/* Filters */}
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex flex-wrap gap-4">
        <div className="w-full md:w-auto">
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">All Statuses</option>
            <option value="Planned">Planned</option>
            <option value="In Production">In Production</option>
            <option value="Quality Check">Quality Check</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="w-full md:w-auto">
          <label className="block text-sm font-medium text-gray-700 mb-1">Workstation</label>
          <select
            name="workstation"
            value={filters.workstation}
            onChange={handleFilterChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">All Workstations</option>
            {workstations.map((workstation) => (
              <option key={workstation._id} value={workstation.name}>
                {workstation.name}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full md:w-auto">
          <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <input
            type="text"
            name="search"
            placeholder="Search orders..."
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("orderId")}
              >
                <div className="flex items-center">
                  Order ID
                  {sort.field === "orderId" &&
                    (sort.direction === "asc" ? (
                      <ChevronUp className="w-4 h-4 ml-1" />
                    ) : (
                      <ChevronDown className="w-4 h-4 ml-1" />
                    ))}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Product Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Quantity
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Priority
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("startDate")}
              >
                <div className="flex items-center">
                  Start Date
                  {sort.field === "startDate" &&
                    (sort.direction === "asc" ? (
                      <ChevronUp className="w-4 h-4 ml-1" />
                    ) : (
                      <ChevronDown className="w-4 h-4 ml-1" />
                    ))}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("endDate")}
              >
                <div className="flex items-center">
                  End Date
                  {sort.field === "endDate" &&
                    (sort.direction === "asc" ? (
                      <ChevronUp className="w-4 h-4 ml-1" />
                    ) : (
                      <ChevronDown className="w-4 h-4 ml-1" />
                    ))}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan="8" className="px-6 py-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : getSortedOrders().length === 0 ? (
              <tr>
                <td colSpan="8" className="px-6 py-4 text-center">
                  No orders found
                </td>
              </tr>
            ) : (
              getSortedOrders().map((order) => (
                <tr
                  key={order?._id}
                  className={order?.endDate && isOverdue(order.endDate) && order.status !== "Completed" ? "bg-red-50" : ""}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order?.orderId || order?._id?.substring(0, 8) || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order?.productName || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order?.quantity || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <PriorityBadge priority={order?.priority} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={order?.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order?.startDate ? new Date(order.startDate).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order?.endDate ? new Date(order.endDate).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => order && openUpdateModal(order)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>

                      {isManager && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => order?._id && handleDeleteOrder(order._id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="flex-1 flex justify-between sm:hidden">
          <Button
            variant="outline"
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={pagination.page * pagination.limit >= (pagination.total || 0)}
          >
            Next
          </Button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">
                {orders.length ? (pagination.page - 1) * pagination.limit + 1 : 0}
              </span>{" "}
              to{" "}
              <span className="font-medium">
                {Math.min(pagination.page * pagination.limit, pagination.total || 0)}
              </span>{" "}
              of <span className="font-medium">{pagination.total || 0}</span> results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <Button
                variant="outline"
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page * pagination.limit >= (pagination.total || 0)}
              >
                Next
              </Button>
            </nav>
          </div>
        </div>
      </div>

      {/* Update Status Modal */}
      {isUpdateModalOpen && (
        <UpdateOrderStatusModal
          order={selectedOrder}
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
        />
      )}
    </div>
  )
}

export default OrdersTable