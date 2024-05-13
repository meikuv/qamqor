import React, { createContext, useMemo, useState, FC, ReactNode } from 'react'
import assistanceService, { IAssistance, ILawyer } from '../../services/assistance.service'

interface IContext {
  isLoading: boolean
  charityList: IAssistance[] | undefined
  volunteerList: IAssistance[] | undefined
  lawyerList: ILawyer[] | undefined
  getAllCharity: () => Promise<IAssistance[] | undefined>
  getAllVolunteer: () => Promise<IAssistance[] | undefined>
  getAllLawyer: () => Promise<ILawyer[] | undefined>
}

interface AssistanceProviderProps {
  children: ReactNode
}

export const AssistanceContext = createContext<IContext>({} as IContext)

export const AssistanceProvider: FC<AssistanceProviderProps> = ({ children }) => {
  const [charityList, setCharityList] = useState<IAssistance[]>()
  const [volunteerList, setVolunteerList] = useState<IAssistance[]>()
  const [lawyerList, setLawyerList] = useState<ILawyer[]>()
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

  const getAllLawyer = async () => {
    try {
      setIsLoading(true)
      const { data } = await assistanceService.getAllLawyer()
      setLawyerList(data)
      return data
    } catch (error) {
      throw new Error('Get all lawyer error')
    } finally {
      setIsLoading(false)
    }
  }

  const value = useMemo(
    () => ({
      isLoading: isLoading,
      charityList: charityList,
      volunteerList: volunteerList,
      lawyerList: lawyerList,
      getAllVolunteer: getAllVolunteer,
      getAllCharity: getAllCharity,
      getAllLawyer: getAllLawyer,
    }),
    [isLoading]
  )

  return <AssistanceContext.Provider value={value}>{children}</AssistanceContext.Provider>
}
