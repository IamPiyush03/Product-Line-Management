import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import workstationService from "../../services/workstationService"
import { toast } from "react-toastify"

// Get all workstations
export const getWorkstations = createAsyncThunk("workstations/getAll", async (_, { rejectWithValue }) => {
  try {
    return await workstationService.getWorkstations()
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Failed to fetch workstations"
    return rejectWithValue(message)
  }
})

const initialState = {
  workstations: [],
  isLoading: false,
  error: null,
}

const workstationsSlice = createSlice({
  name: "workstations",
  initialState,
  reducers: {
    resetWorkstationsState: (state) => {
      state.error = null
      state.isLoading = false
    },
  },
  extraReducers: (builder) => {
    builder
      // Get workstations
      .addCase(getWorkstations.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getWorkstations.fulfilled, (state, action) => {
        state.isLoading = false
        state.workstations = action.payload
      })
      .addCase(getWorkstations.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        toast.error(action.payload)
      })
  },
})

export const { resetWorkstationsState } = workstationsSlice.actions
export default workstationsSlice.reducer

