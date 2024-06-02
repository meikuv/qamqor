import React, { createContext, useMemo, useState, useRef, useEffect, FC, ReactNode } from 'react'
import { AppState } from 'react-native'
import { showToast } from '../../components/toast'
import { useTranslation } from 'react-i18next'
import authService from '../../services/auth.service'
import userService from '../../services/user.service'
import tokenService from '../../services/token.service'

interface IContext {
  isLoading: boolean
  token: string | null | undefined
  login: (username: string, password: string) => Promise<void>
  register: (username: string, email: string, password: string) => Promise<void>
  verification: (email: string, code: string) => Promise<void>
  logout: () => Promise<void>
  refreshAccessToken: () => Promise<string | null>
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext<IContext>({} as IContext)

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const { t } = useTranslation()
  const appState = useRef(AppState.currentState)
  const [token, setToken] = useState<string | undefined | null>(null)
  const [appStateVisible, setAppStateVisible] = useState(appState.current)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const login = async (username: string, password: string) => {
    setIsLoading(true)
    try {
      const { data } = await authService.login(username, password)
      await tokenService.setCredentials(data)
      setToken(data.accessToken)
      showToast('success', t('login.loginButton'), t('login.loginSuccess'))
      return data
    } catch (error: any) {
      if (error.response) {
        const errorMessage = error.response.data.message
        showToast('error', t('login.loginButton'), errorMessage)
      } else {
        showToast('error', t('login.loginButton'), t('login.loginError'))
      }
      throw new Error('Login error')
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (username: string, email: string, password: string) => {
    setIsLoading(true)
    try {
      const { data } = await authService.register(username, email, password)
      showToast('success', t('register.title'), t('register.registerSuccess'))
      return data
    } catch (error: any) {
      if (error.response) {
        const errorMessage = error.response.data.message
        showToast('error', t('register.title'), errorMessage)
      } else {
        showToast('error', t('register.title'), t('register.registerError'))
      }
      throw new Error('Registration error')
    } finally {
      setIsLoading(false)
    }
  }

  const verification = async (email: string, code: string) => {
    setIsLoading(true)
    try {
      const { data } = await authService.verification(email, code)
      showToast('success', t('verification.title'), t('verification.verificationSuccess'))
      return data
    } catch (error: any) {
      if (error.response) {
        const errorMessage = error.response.data.message
        showToast('error', t('verification.title'), errorMessage)
      } else {
        showToast('error', t('verification.title'), t('verification.verificationError'))
      }
      throw new Error('Verification error')
    } finally {
      setIsLoading(false)
    }
  }

  const refreshAccessToken = async (): Promise<string | null> => {
    const refreshToken = await tokenService.getLocalRefreshToken()
    try {
      const { data } = await authService.refreshToken(refreshToken)
      await tokenService.setCredentials(data)
      return data.accessToken
    } catch (error) {
      console.log('request')
      await tokenService.clearCredentials()
      setToken(null)
      return null
    }
  }

  const logout = async () => {
    setIsLoading(true)
    try {
      const { data } = await userService.logout()
      await tokenService.clearCredentials()
      setToken(null)
      showToast('success', t('logout.title'), t('logout.logoutSuccess'))
      return data
    } catch (error: any) {
      await tokenService.clearCredentials()
      setToken(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadStorageToken()
  }, [])

  async function loadStorageToken(): Promise<void> {
    try {
      const storageToken = await tokenService.getLocalAccessToken()
      if (storageToken) {
        setToken(storageToken)
      }
    } catch (error) {
    } finally {
    }
  }

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      appState.current = nextAppState
      setAppStateVisible(appState.current)

      if (nextAppState === 'background') {
        setAppStateVisible('background')
      }
    })

    return () => {
      subscription.remove()
    }
  }, [])

  const value = useMemo(
    () => ({
      isLoading: isLoading,
      token: token,
      login: login,
      refreshAccessToken: refreshAccessToken,
      register: register,
      logout: logout,
      verification: verification,
    }),
    [isLoading, token]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
