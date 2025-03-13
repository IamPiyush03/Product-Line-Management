import api from "./api"

// Get all orders with optional filters
const getOrders = async (filters = {}) => {
  const params = new URLSearchParams()

  if (filters.status) {
    params.append("status", filters.status)
  }

  if (filters.workstation) {
    params.append("workstation", filters.workstation)
  }

  const response = await api.get(`/orders?${params.toString()}`)
  return response.data
}

// Create new order
const createOrder = async (orderData) => {
  try {
    console.log('Sending order data:', JSON.stringify(orderData, null, 2))
    const response = await api.post("/orders", orderData)
    return response.data
  } catch (error) {
    console.error('API Error:', {
      status: error.response?.status,
      data: error.response?.data,
      errors: error.response?.data?.errors
    })
    throw error
  }
}

// Update order status
const updateOrderStatus = async (id, status) => {
  const response = await api.put(`/orders/${id}/status`, { status })
  return response.data
}

// Delete order
const deleteOrder = async (id) => {
  const response = await api.delete(`/orders/${id}`)
  return response.data
}

const orderService = {
  getOrders,
  createOrder,
  updateOrderStatus,
  deleteOrder,
}

export default orderService

