import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import analyticsService from "../../services/analyticsService"
import { toast } from "react-toastify"

// Get analytics overview
export const getAnalyticsOverview = createAsyncThunk("analytics/getOverview", async (_, { rejectWithValue }) => {
  try {
    return await analyticsService.getOverview()
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Failed to fetch analytics"
    return rejectWithValue(message)
  }
})

const initialState = {
  overview: {
    totalOrders: 0,
    ordersByStatus: [],
    materialUsage: [],
  },
  isLoading: false,
  error: null,
}

const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {
    resetAnalyticsState: (state) => {
      state.error = null
      state.isLoading = false
    },
  },
  extraReducers: (builder) => {
    builder
      // Get analytics overview
      .addCase(getAnalyticsOverview.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getAnalyticsOverview.fulfilled, (state, action) => {
        state.isLoading = false
        state.overview = action.payload
      })
      .addCase(getAnalyticsOverview.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        toast.error(action.payload)
      })
  },
})

export const { resetAnalyticsState } = analyticsSlice.actions
export default analyticsSlice.reducer

