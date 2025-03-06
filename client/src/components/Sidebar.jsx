"use client"

import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Package, Clipboard, BarChart, Settings, X } from "lucide-react"

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { user } = useSelector((state) => state.auth)
  const isManager = user?.role === "Manager"

  return (
    <>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <div
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-gray-800 p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Logo */}
          <NavLink to="/dashboard" className="block">
            <div className="flex items-center">
              <svg className="w-8 h-8 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-white text-lg font-semibold ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                Production Line
              </span>
            </div>
          </NavLink>
          {/* Close button */}
          <button className="lg:hidden text-gray-400 hover:text-gray-200" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <span className="sr-only">Close sidebar</span>
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <div className="space-y-8">
          <div>
            <h3 className="text-xs uppercase text-gray-400 font-semibold pl-3">
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">Pages</span>
              <span className="lg:block lg:sidebar-expanded:hidden 2xl:hidden">Pages</span>
            </h3>
            <ul className="mt-3">
              {/* Dashboard */}
              <li className="mb-0.5 last:mb-0">
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    cn(
                      "block text-gray-200 hover:text-white truncate transition duration-150",
                      isActive ? "text-indigo-400" : "",
                    )
                  }
                >
                  {({ isActive }) => (
                    <div className={`flex items-center py-2 px-3 rounded ${isActive ? "bg-gray-900" : ""}`}>
                      <LayoutDashboard className="shrink-0 h-6 w-6" />
                      <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Dashboard
                      </span>
                    </div>
                  )}
                </NavLink>
              </li>

              {/* Orders */}
              <li className="mb-0.5 last:mb-0">
                <NavLink
                  to="/orders"
                  className={({ isActive }) =>
                    cn(
                      "block text-gray-200 hover:text-white truncate transition duration-150",
                      isActive ? "text-indigo-400" : "",
                    )
                  }
                >
                  {({ isActive }) => (
                    <div className={`flex items-center py-2 px-3 rounded ${isActive ? "bg-gray-900" : ""}`}>
                      <Clipboard className="shrink-0 h-6 w-6" />
                      <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Orders
                      </span>
                    </div>
                  )}
                </NavLink>
              </li>

              {/* Analytics (Manager only) */}
              {isManager && (
                <li className="mb-0.5 last:mb-0">
                  <NavLink
                    to="/analytics"
                    className={({ isActive }) =>
                      cn(
                        "block text-gray-200 hover:text-white truncate transition duration-150",
                        isActive ? "text-indigo-400" : "",
                      )
                    }
                  >
                    {({ isActive }) => (
                      <div className={`flex items-center py-2 px-3 rounded ${isActive ? "bg-gray-900" : ""}`}>
                        <BarChart className="shrink-0 h-6 w-6" />
                        <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                          Analytics
                        </span>
                      </div>
                    )}
                  </NavLink>
                </li>
              )}

              {/* Materials */}
              <li className="mb-0.5 last:mb-0">
                <NavLink
                  to="/materials"
                  className={({ isActive }) =>
                    cn(
                      "block text-gray-200 hover:text-white truncate transition duration-150",
                      isActive ? "text-indigo-400" : "",
                    )
                  }
                >
                  {({ isActive }) => (
                    <div className={`flex items-center py-2 px-3 rounded ${isActive ? "bg-gray-900" : ""}`}>
                      <Package className="shrink-0 h-6 w-6" />
                      <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Materials
                      </span>
                    </div>
                  )}
                </NavLink>
              </li>

              {/* Settings */}
              <li className="mb-0.5 last:mb-0">
                <NavLink
                  to="/settings"
                  className={({ isActive }) =>
                    cn(
                      "block text-gray-200 hover:text-white truncate transition duration-150",
                      isActive ? "text-indigo-400" : "",
                    )
                  }
                >
                  {({ isActive }) => (
                    <div className={`flex items-center py-2 px-3 rounded ${isActive ? "bg-gray-900" : ""}`}>
                      <Settings className="shrink-0 h-6 w-6" />
                      <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Settings
                      </span>
                    </div>
                  )}
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        {/* User info */}
        <div className="mt-auto">
          <div className="bg-gray-700 rounded p-3 flex items-center">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-600">
              <span className="text-sm font-medium text-gray-200">
                {user?.username?.charAt(0).toUpperCase() || "U"}
              </span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-200">{user?.username}</p>
              <p className="text-xs text-gray-400">{user?.role}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar

