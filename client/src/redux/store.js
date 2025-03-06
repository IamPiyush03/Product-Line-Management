import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice"
import ordersReducer from "./slices/ordersSlice"
import materialsReducer from "./slices/materialsSlice"
import workstationsReducer from "./slices/workstationsSlice"
import analyticsReducer from "./slices/analyticsSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    orders: ordersReducer,
    materials: materialsReducer,
    workstations: workstationsReducer,
    analytics: analyticsReducer,
  },
})

