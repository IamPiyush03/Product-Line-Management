import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import authService from "../../services/authService"
import { toast } from "react-toastify"

// Check if user is already logged in
export const checkAuthStatus = createAsyncThunk("auth/checkStatus", async (_, { rejectWithValue }) => {
  try {
    const userJSON = localStorage.getItem("user")
    if (userJSON) {
      return JSON.parse(userJSON)
    }
    return null
  } catch (error) {
    return rejectWithValue("Failed to retrieve auth status")
  }
})

// Register user
export const register = createAsyncThunk("auth/register", async (userData, { rejectWithValue }) => {
  try {
    return await authService.register(userData)
  } catch (error) {
    const message =
      error.response?.data?.message || error.response?.data?.errors?.[0]?.msg || error.message || "Registration failed"
    return rejectWithValue(message)
  }
})

// Login user
export const login = createAsyncThunk("auth/login", async (userData, { rejectWithValue }) => {
  try {
    return await authService.login(userData)
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Login failed"
    return rejectWithValue(message)
  }
})

// Logout user
export const logout = createAsyncThunk("auth/logout", async () => {
  authService.logout()
})

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.error = null
      state.isLoading = false
    },
  },
  extraReducers: (builder) => {
    builder
      // Check auth status
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.user = action.payload
        state.isAuthenticated = !!action.payload
      })
      // Register
      .addCase(register.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isAuthenticated = true
        state.user = action.payload
        toast.success("Registration successful!")
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        toast.error(action.payload)
      })
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isAuthenticated = true
        state.user = action.payload
        toast.success("Login successful!")
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        toast.error(action.payload)
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null
        state.isAuthenticated = false
        toast.info("Logged out successfully")
      })
  },
})

export const { resetAuthState } = authSlice.actions
export default authSlice.reducer

