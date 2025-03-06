"use client"

import { useSelector, useDispatch } from "react-redux"
import { logout } from "../redux/slices/authSlice"
import { Button } from "@/components/ui/button"
import { Menu, X, User, LogOut } from "lucide-react"

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">
          {/* Left: Hamburger button */}
          <div className="flex lg:hidden">
            <button
              className="text-gray-500 hover:text-gray-600"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <span className="sr-only">Open sidebar</span>
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Right: User info */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <div className="mr-2 hidden md:block">
                <span className="font-medium text-gray-800">{user?.username}</span>
                <span className="block text-xs text-gray-500">{user?.role}</span>
              </div>
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
                <User className="w-4 h-4 text-gray-500" />
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="flex items-center">
              <LogOut className="w-4 h-4 mr-1" />
              <span className="hidden md:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

