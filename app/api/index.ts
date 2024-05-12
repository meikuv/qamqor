import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import tokenService, { ICredentials } from '../services/token.service'

const axiosInstance: AxiosInstance = axios.create({
  withCredentials: true,
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = await tokenService.getLocalAccessToken()
    console.log(config.url)
    if (accessToken && !config.url?.startsWith('/auth/account')) {
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

    if (error.response?.status === 401 && !originalRequest.url?.startsWith('/auth/account')) {
      console.log('refresh')
      const newAccessToken = await refreshAccessToken()
      if (newAccessToken !== null) {
        originalRequest.headers = originalRequest.headers || {}
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        return axiosInstance(originalRequest)
      }
    }
    return Promise.reject(error)
  }
)

const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = await tokenService.getLocalRefreshToken()
  try {
    const { data } = await axiosInstance.post<ICredentials>('/auth/account/refresh-token', {
      refreshToken,
    })
    await tokenService.setCredentials(data)
    return data.accessToken
  } catch (error) {
    console.log('request')
    await tokenService.clearCredentials()
    return null
  }
}

export default axiosInstance
