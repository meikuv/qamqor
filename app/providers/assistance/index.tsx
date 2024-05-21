import React, { createContext, useMemo, useState, FC, ReactNode } from 'react'
import assistanceService, {
  IAssistance,
  ILaw,
  ILawyer,
  IMapLocation,
} from '../../services/assistance.service'

interface IContext {
  isLoading: boolean
  charityList: IAssistance[] | undefined
  volunteerList: IAssistance[] | undefined
  lawyerList: ILawyer[] | undefined
  lawList: ILaw[] | undefined
  locationList: IMapLocation[] | undefined
  getAllCharity: () => Promise<IAssistance[] | undefined>
  getAllVolunteer: () => Promise<IAssistance[] | undefined>
  getAllLawyer: () => Promise<ILawyer[] | undefined>
  getAllLaw: () => Promise<ILaw[] | undefined>
  getAllMapLocation: () => Promise<IMapLocation[] | undefined>
}

interface AssistanceProviderProps {
  children: ReactNode
}

export const AssistanceContext = createContext<IContext>({} as IContext)

export const AssistanceProvider: FC<AssistanceProviderProps> = ({ children }) => {
  const [charityList, setCharityList] = useState<IAssistance[]>()
  const [volunteerList, setVolunteerList] = useState<IAssistance[]>()
  const [lawyerList, setLawyerList] = useState<ILawyer[]>()
  const [lawList, setLawList] = useState<ILaw[]>()
  const [locationList, setLocationList] = useState<IMapLocation[]>()
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

  const getAllLaw = async () => {
    try {
      setIsLoading(true)
      const { data } = await assistanceService.getAllLaw()
      setLawList(data)
      return data
    } catch (error) {
      throw new Error('Get all law error')
    } finally {
      setIsLoading(false)
    }
  }

  const getAllMapLocation = async () => {
    try {
      setIsLoading(true)
      const { data } = await assistanceService.getAllMapLocation()
      setLocationList(data)
      return data
    } catch (error) {
      throw new Error('Get all location error')
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
      lawList: lawList,
      locationList: locationList,
      getAllVolunteer: getAllVolunteer,
      getAllCharity: getAllCharity,
      getAllLawyer: getAllLawyer,
      getAllLaw: getAllLaw,
      getAllMapLocation: getAllMapLocation,
    }),
    [isLoading]
  )

  return <AssistanceContext.Provider value={value}>{children}</AssistanceContext.Provider>
}
