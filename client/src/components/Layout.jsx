"use client"

import { useState, useEffect } from "react"
import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"
import Header from "./Header"
import { useDispatch } from "react-redux"
import { getOrders } from "../redux/slices/ordersSlice"
import { getMaterials } from "../redux/slices/materialsSlice"
import { getWorkstations } from "../redux/slices/workstationsSlice"

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    // Fetch initial data when layout mounts
    dispatch(getOrders())
    dispatch(getMaterials())
    dispatch(getWorkstations())
  }, [dispatch])

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout

