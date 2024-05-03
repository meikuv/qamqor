import React, { createContext, useMemo, useState, useRef, useEffect, FC, ReactNode } from 'react'
import { AppState } from 'react-native'
import { showToast } from '../../components/toast'
import authService from '../../services/auth.service'
import userService from '../../services/user.service'
import tokenService from '../../services/token.service'
import { useTranslation } from 'react-i18next'

interface IContext {
  isLoading: boolean
  isLoggedIn: boolean
  login: (username: string, password: string) => Promise<void>
  register: (username: string, email: string, password: string) => Promise<void>
  verification: (email: string, code: string) => Promise<void>
  logout: () => Promise<void>
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext<IContext>({} as IContext)

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const { t } = useTranslation()
  const appState = useRef(AppState.currentState)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [appStateVisible, setAppStateVisible] = useState(appState.current)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const login = async (username: string, password: string) => {
    setIsLoading(true)
    try {
      const { data } = await authService.login(username, password)
      await tokenService.setCredentials(data)
      setIsLoggedIn(true)
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

  const logout = async () => {
    setIsLoading(true)
    try {
      const { data } = await userService.logout()
      await tokenService.clearCredentials()
      setIsLoggedIn(false)
      showToast('success', t('logout.title'), t('logout.logoutSuccess'))
      return data
    } catch (error: any) {
      if (error.response) {
        const errorMessage = error.response.data.message
        showToast('error', t('logout.title'), errorMessage)
      } else {
        showToast('error', t('logout.title'), 'Ошибка сети')
      }
      throw new Error('Logout error')
    } finally {
      setIsLoading(false)
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
      isLoggedIn: isLoggedIn,
      login: login,
      register: register,
      logout: logout,
      verification: verification,
    }),
    [isLoading]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
