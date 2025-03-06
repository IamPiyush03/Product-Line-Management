import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth)

  // Show loading or redirect to login if not authenticated
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoute

