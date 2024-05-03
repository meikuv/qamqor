import React, { createContext, useMemo, useState, FC, ReactNode } from 'react'
import assistanceService, { IAssistance } from '../../services/assistance.service'

interface IContext {
  isLoading: boolean
  charityList: IAssistance[] | undefined
  volunteerList: IAssistance[] | undefined
  getAllCharity: () => Promise<IAssistance[] | undefined>
  getAllVolunteer: () => Promise<IAssistance[] | undefined>
}

interface AssistanceProviderProps {
  children: ReactNode
}

export const AssistanceContext = createContext<IContext>({} as IContext)

export const AssistanceProvider: FC<AssistanceProviderProps> = ({ children }) => {
  const [charityList, setCharityList] = useState<IAssistance[]>()
  const [volunteerList, setVolunteerList] = useState<IAssistance[]>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const getAllCharity = async () => {
    try {
      setIsLoading(true)
      const { data } = await assistanceService.getAllCharity()
      setCharityList(data)
      return data
    } catch (error) {
      throw new Error('Get all assistance error')
    } finally {
      setIsLoading(false)
    }
  }

  const getAllVolunteer = async () => {
    try {
      setIsLoading(true)
      const { data } = await assistanceService.getAllVolunteer()
      setVolunteerList(data)
      return data
    } catch (error) {
      throw new Error('Get all assistance error')
    } finally {
      setIsLoading(false)
    }
  }

  const value = useMemo(
    () => ({
      isLoading: isLoading,
      charityList: charityList,
      volunteerList: volunteerList,
      getAllVolunteer: getAllVolunteer,
      getAllCharity: getAllCharity,
    }),
    [isLoading]
  )

  return <AssistanceContext.Provider value={value}>{children}</AssistanceContext.Provider>
}
