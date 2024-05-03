import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import tokenService from '../services/token.service'

const axiosInstance: AxiosInstance = axios.create({
  withCredentials: true,
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = await tokenService.getLocalAccesToken()
    console.log(accessToken)
    console.log(config.url)
    if (accessToken && config.url !== '/auth/account/login') {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config as AxiosRequestConfig

    if (error.response?.status === 401 && originalRequest.url !== '/auth/account/login') {
      try {
        const newAccessToken = await tokenService.refreshAccessToken()
        if (newAccessToken !== null) {
          originalRequest.headers = originalRequest.headers || {}
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

          return axiosInstance(originalRequest)
        }
      } catch (error) {
        console.log('Error refreshing access token: ', error)
      }
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
