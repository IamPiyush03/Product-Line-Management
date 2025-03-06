import api from "./api"

// Get all workstations
const getWorkstations = async () => {
  const response = await api.get("/workstations")
  return response.data
}

const workstationService = {
  getWorkstations,
}

export default workstationService

