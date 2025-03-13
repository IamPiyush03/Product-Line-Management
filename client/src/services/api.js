import axios from "axios"

const API_URL = "https://product-line-management-backend.onrender.com/api"|| 'http://localhost:5000';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
    timeout: 5000,
    maxContentLength: 10000000
})

// Updated request interceptor
api.interceptors.request.use(
    (config) => {
        const userJSON = localStorage.getItem("user")
        if (userJSON) {
            const user = JSON.parse(userJSON)
            if (user?.token) {
                config.headers.Authorization = `Bearer ${user.token}`
            }
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Updated response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("user")
            window.location.href = "/login"
        }
        return Promise.reject(error)
    }
)

export default api