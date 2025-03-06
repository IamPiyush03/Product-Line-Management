import api from "./api"

// Get analytics overview
const getOverview = async () => {
  const response = await api.get("/analytics/overview")
  return response.data
}

const analyticsService = {
  getOverview,
}

export default analyticsService

