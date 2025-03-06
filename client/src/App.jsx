"use client"

import { useEffect } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ProtectedRoute from "./components/ProtectedRoute"
import ManagerDashboard from "./pages/ManagerDashboard"
import OperatorDashboard from "./pages/OperatorDashboard"
import Layout from "./components/Layout"
import { checkAuthStatus } from "./redux/slices/authSlice"
import MaterialsView from "./pages/MaterialsView"
import AnalyticsView from "./pages/AnalyticsView"
import SettingsView from "./pages/SettingsView"
import OrdersTable from "./components/OrdersTable"
import "./index.css";


function App() {
  const { user, isAuthenticated } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkAuthStatus())
  }, [dispatch])

  return (
    <Routes>
      <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
      <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          {/* Dashboard Route */}
          <Route 
            path="/dashboard" 
            element={user?.role === "Manager" ? <ManagerDashboard /> : <OperatorDashboard />} 
          />
          
          {/* Orders Route */}
          <Route 
            path="/orders" 
            element={<OrdersTable isManager={user?.role === "Manager"} />} 
          />

          {/* Materials Route */}
          <Route 
            path="/materials" 
            element={<MaterialsView />} // You'll need to create this component
          />

          {/* Analytics Route (Manager Only) */}
          <Route 
            path="/analytics" 
            element={user?.role === "Manager" ? <AnalyticsView /> : <Navigate to="/dashboard" />} 
          />

          {/* Settings Route */}
          <Route 
            path="/settings" 
            element={<SettingsView />} // You'll need to create this component
          />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
    </Routes>
  )
}
export default App

