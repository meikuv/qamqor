import React, { createContext, useMemo, useState, FC, ReactNode } from 'react'
import { showToast } from '../../components/toast'
import { useTranslation } from 'react-i18next'
import userService, { IChangePassword, IUser } from '../../services/user.service'

interface IContext {
  isLoading: boolean
  user: IUser
  connectedUser: () => Promise<IUser | undefined>
  updateUser: (user: IUser) => Promise<void>
  uploadImage: (uri: string) => Promise<IUser | undefined>
  changePassword: (passwords: IChangePassword) => Promise<void>
}

interface UserProviderProps {
  children: ReactNode
}

export const UserContext = createContext<IContext>({} as IContext)

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const { t } = useTranslation()
  const [user, setUser] = useState<IUser>({} as IUser)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const connectedUser = async () => {
    setIsLoading(true)
    try {
      const { data } = await userService.connectedUser()
      setUser(data)
      return data
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  }

  const updateUser = async (user: IUser) => {
    setIsLoading(true)
    try {
      const { data } = await userService.updateUser(user)
      showToast('success', t('profileUpdate.title'), t('profileUpdate.responseSuccess'))
      setUser(data)
      return data
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  }

  const uploadImage = async (uri: string) => {
    setIsLoading(true)
    try {
      const { data } = await userService.uploadImage(uri)
      showToast('success', t('profileUpdate.title'), t('profileUpdate.imageSuccess'))
      setUser(data)
      return data
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  }

  const changePassword = async (passwords: IChangePassword) => {
    setIsLoading(true)
    try {
      const { data } = await userService.changePassword(passwords)
      showToast('success', t('changePassword.title'), t('changePassword.responseSuccess'))
      return data
    } catch (error: any) {
      if (error.response) {
        const errorMessage = error.response.data.message
        showToast('error', t('changePassword.title'), errorMessage)
      } else {
        showToast('error', t('changePassword.title'), t('login.loginError'))
      }
    } finally {
      setIsLoading(false)
    }
  }

  const value = useMemo(
    () => ({
      isLoading: isLoading,
      user: user,
      connectedUser: connectedUser,
      updateUser: updateUser,
      uploadImage: uploadImage,
      changePassword: changePassword,
    }),
    [isLoading]
  )

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
