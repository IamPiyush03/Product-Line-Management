import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import orderService from "../../services/orderService"
import { toast } from "react-toastify"

// Get all orders with optional filters
export const getOrders = createAsyncThunk("orders/getAll", async (filters, { rejectWithValue }) => {
  try {
    return await orderService.getOrders(filters)
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Failed to fetch orders"
    return rejectWithValue(message)
  }
})

// Create new order
export const createOrder = createAsyncThunk("orders/create", async (orderData, { rejectWithValue }) => {
  try {
    const response = await orderService.createOrder(orderData)
    return response.data
  } catch (error) {
    // Extract the validation error message from the errors array
    const errorMessage = error.response?.data?.errors?.[0]?.msg || 
                        error.response?.data?.message ||
                        'Failed to create order'
    console.log('Server validation errors:', error.response?.data?.errors)
    return rejectWithValue(errorMessage)
  }
})

// Update order status
export const updateOrderStatus = createAsyncThunk(
  "orders/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      return await orderService.updateOrderStatus(id, status)
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Failed to update order status"
      return rejectWithValue(message)
    }
  },
)

// Delete order
export const deleteOrder = createAsyncThunk("orders/delete", async (id, { rejectWithValue }) => {
  try {
    await orderService.deleteOrder(id)
    return id
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Failed to delete order"
    return rejectWithValue(message)
  }
})

const initialState = {
  orders: [],
  isLoading: false,
  error: null,
  filters: {
    status: "",
    workstation: "",
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },
  sort: {
    field: "createdAt",
    direction: "desc",
  },
}

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
      state.pagination.page = 1 // Reset to first page when filters change
    },
    setPage: (state, action) => {
      state.pagination.page = action.payload
    },
    setSort: (state, action) => {
      state.sort = action.payload
    },
    resetOrdersState: (state) => {
      state.error = null
      state.isLoading = false
    },
  },
  extraReducers: (builder) => {
    builder
      // Get orders
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false
        state.orders = action.payload
        state.pagination.total = action.payload.length
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        toast.error(action.payload)
      })
      // Create order
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false
        state.orders.unshift(action.payload)
        toast.success("Order created successfully")
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        toast.error(action.payload)
      })
      // Update order status
      .addCase(updateOrderStatus.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.isLoading = false
        const index = state.orders.findIndex((order) => order._id === action.payload._id)
        if (index !== -1) {
          state.orders[index] = action.payload
        }
        toast.success("Order status updated successfully")
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        toast.error(action.payload)
      })
      // Delete order
      .addCase(deleteOrder.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.isLoading = false
        state.orders = state.orders.filter((order) => order._id !== action.payload)
        toast.success("Order deleted successfully")
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        toast.error(action.payload)
      })
  },
})

export const { setFilters, setPage, setSort, resetOrdersState } = ordersSlice.actions
export default ordersSlice.reducer

