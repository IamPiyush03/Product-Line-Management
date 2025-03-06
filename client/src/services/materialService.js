import api from "./api"

// Get all materials
const getMaterials = async () => {
  const response = await api.get("/materials")
  return response.data
}

// Update material
const updateMaterial = async (id, materialData) => {
  const response = await api.put(`/materials/${id}`, materialData)
  return response.data
}

const materialService = {
  getMaterials,
  updateMaterial,
}

export default materialService

