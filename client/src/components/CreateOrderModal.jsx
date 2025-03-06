"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createOrder } from "../redux/slices/ordersSlice"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

const CreateOrderModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch()
  const { materials } = useSelector((state) => state.materials)
  const { workstations } = useSelector((state) => state.workstations)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    productName: "",
    quantity: "",
    priority: "Medium",
    workstationId: "",
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    materialsUsed: [],
  })

  const [selectedMaterials, setSelectedMaterials] = useState([{ materialId: "", quantity: "" }])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleMaterialChange = (index, field, value) => {
    const updatedMaterials = [...selectedMaterials]
    updatedMaterials[index][field] = value
    setSelectedMaterials(updatedMaterials)
  }

  const addMaterialField = () => {
    setSelectedMaterials([...selectedMaterials, { materialId: "", quantity: "" }])
  }

  const removeMaterialField = (index) => {
    const updatedMaterials = [...selectedMaterials]
    updatedMaterials.splice(index, 1)
    setSelectedMaterials(updatedMaterials)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Filter out empty material selections
    const materialsUsed = selectedMaterials.filter((material) => material.materialId && material.quantity)

    try {
      const orderData = {
        ...formData,
        quantity: Number.parseInt(formData.quantity),
        materialsUsed,
      }

      await dispatch(createOrder(orderData)).unwrap()
      onClose()
    } catch (error) {
      console.error("Failed to create order:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-start">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Create New Order</h3>
              <button
                type="button"
                className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                onClick={onClose}
              >
                <span className="sr-only">Close</span>
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="mt-4">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-4">
                  {/* Product Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Product Name</label>
                    <input
                      type="text"
                      name="productName"
                      value={formData.productName}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>

                  {/* Quantity */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Quantity</label>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      required
                      min="1"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>

                  {/* Priority */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Priority</label>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>

                  {/* Workstation */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Workstation</label>
                    <select
                      name="workstationId"
                      value={formData.workstationId}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                      <option value="">Select Workstation</option>
                      {workstations.map((workstation) => (
                        <option key={workstation._id} value={workstation._id}>
                          {workstation.name} ({workstation.status})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Start Date</label>
                      <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">End Date</label>
                      <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  {/* Materials */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Materials</label>

                    {selectedMaterials.map((material, index) => (
                      <div key={index} className="flex items-center space-x-2 mb-2">
                        <select
                          value={material.materialId}
                          onChange={(e) => handleMaterialChange(index, "materialId", e.target.value)}
                          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                          <option value="">Select Material</option>
                          {materials.map((mat) => (
                            <option key={mat._id} value={mat._id}>
                              {mat.name} (Stock: {mat.currentStock})
                            </option>
                          ))}
                        </select>

                        <input
                          type="number"
                          placeholder="Qty"
                          value={material.quantity}
                          onChange={(e) => handleMaterialChange(index, "quantity", e.target.value)}
                          min="1"
                          className="block w-24 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />

                        <button
                          type="button"
                          onClick={() => removeMaterialField(index)}
                          className="text-red-600 hover:text-red-800"
                          disabled={selectedMaterials.length === 1}
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    ))}

                    <Button type="button" variant="outline" size="sm" onClick={addMaterialField} className="mt-2">
                      Add Material
                    </Button>
                  </div>
                </div>

                <div className="mt-5 sm:mt-6 flex justify-end">
                  <Button type="button" variant="outline" onClick={onClose} className="mr-3">
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Creating..." : "Create Order"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateOrderModal

