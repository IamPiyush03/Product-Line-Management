import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import materialService from "../../services/materialService"
import { toast } from "react-toastify"

// Get all materials
export const getMaterials = createAsyncThunk("materials/getAll", async (_, { rejectWithValue }) => {
  try {
    return await materialService.getMaterials()
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Failed to fetch materials"
    return rejectWithValue(message)
  }
})

// Update material stock
export const updateMaterial = createAsyncThunk(
  "materials/update",
  async ({ id, materialData }, { rejectWithValue }) => {
    try {
      return await materialService.updateMaterial(id, materialData)
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.errors?.[0]?.msg ||
        error.message ||
        "Failed to update material"
      return rejectWithValue(message)
    }
  },
)

const initialState = {
  materials: [],
  isLoading: false,
  error: null,
  lowStockAlerts: [],
}

const materialsSlice = createSlice({
  name: "materials",
  initialState,
  reducers: {
    resetMaterialsState: (state) => {
      state.error = null
      state.isLoading = false
    },
  },
  extraReducers: (builder) => {
    builder
      // Get materials
      .addCase(getMaterials.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getMaterials.fulfilled, (state, action) => {
        state.isLoading = false
        state.materials = action.payload
        // Check for low stock
        state.lowStockAlerts = action.payload.filter((material) => material.currentStock <= material.minimumStockLevel)
      })
      .addCase(getMaterials.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        toast.error(action.payload)
      })
      // Update material
      .addCase(updateMaterial.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updateMaterial.fulfilled, (state, action) => {
        state.isLoading = false
        const index = state.materials.findIndex((material) => material._id === action.payload._id)
        if (index !== -1) {
          state.materials[index] = action.payload
        }
        // Update low stock alerts
        state.lowStockAlerts = state.materials.filter((material) => material.currentStock <= material.minimumStockLevel)
        toast.success("Material updated successfully")
      })
      .addCase(updateMaterial.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        toast.error(action.payload)
      })
  },
})

export const { resetMaterialsState } = materialsSlice.actions
export default materialsSlice.reducer

