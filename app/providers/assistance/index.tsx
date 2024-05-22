import React, { createContext, useMemo, useState, FC, ReactNode } from 'react'
import assistanceService, {
  IAssistance,
  ICanHelp,
  ILaw,
  ILawyer,
  IMapLocation,
  INeedHelp,
} from '../../services/assistance.service'
import { showToast } from '../../components/toast'
import { useTranslation } from 'react-i18next'

interface IContext {
  isLoading: boolean
  charityList: IAssistance[] | undefined
  volunteerList: IAssistance[] | undefined
  lawyerList: ILawyer[] | undefined
  lawList: ILaw[] | undefined
  locationList: IMapLocation[] | undefined
  canHelpList: ICanHelp[] | undefined
  needHelpList: INeedHelp[] | undefined
  combinedHelpList: Array<ICanHelp | INeedHelp> | undefined
  getAllCharity: () => Promise<IAssistance[] | undefined>
  getAllVolunteer: () => Promise<IAssistance[] | undefined>
  getAllLawyer: () => Promise<ILawyer[] | undefined>
  getAllLaw: () => Promise<ILaw[] | undefined>
  getAllMapLocation: () => Promise<IMapLocation[] | undefined>
  getAllCanHelp: (username: string) => Promise<ICanHelp[] | undefined>
  createCanHelp: (canHelp: ICanHelp) => Promise<any>
  getAllNeedHelp: (username: string) => Promise<INeedHelp[] | undefined>
  createNeedHelp: (needHelp: INeedHelp) => Promise<any>
}

interface AssistanceProviderProps {
  children: ReactNode
}

export const AssistanceContext = createContext<IContext>({} as IContext)

export const AssistanceProvider: FC<AssistanceProviderProps> = ({ children }) => {
  const { t } = useTranslation()
  const [charityList, setCharityList] = useState<IAssistance[]>()
  const [volunteerList, setVolunteerList] = useState<IAssistance[]>()
  const [lawyerList, setLawyerList] = useState<ILawyer[]>()
  const [lawList, setLawList] = useState<ILaw[]>()
  const [locationList, setLocationList] = useState<IMapLocation[]>()
  const [canHelpList, setCanHelpList] = useState<ICanHelp[]>()
  const [needHelpList, setNeedHelpList] = useState<INeedHelp[]>()
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

  const getAllCanHelp = async (username: string) => {
    try {
      setIsLoading(true)
      const { data } = await assistanceService.getAllCanHelpByUsername(username)
      setCanHelpList(data)
      return data
    } catch (error) {
      throw new Error('Get all canHelp error')
    } finally {
      setIsLoading(false)
    }
  }

  const createCanHelp = async (canHelp: ICanHelp) => {
    try {
      setIsLoading(true)
      const { data } = await assistanceService.createCanHelp(canHelp)
      setCanHelpList((prevCanHelpList) =>
        prevCanHelpList ? [...prevCanHelpList, canHelp] : [canHelp]
      )
      showToast('success', t('volunteer.canHelp.send'), t('volunteer.canHelp.sendSuccess'))
      return data
    } catch (error: any) {
      if (error?.response) {
        const errorMessage = error.response.data.message
        showToast('error', t('volunteer.canHelp.send'), errorMessage)
      } else {
        showToast('error', t('volunteer.canHelp.send'), t('volunteer.canHelp.sendError'))
      }
      throw new Error('Create canHelp error')
    } finally {
      setIsLoading(false)
    }
  }

  const getAllNeedHelp = async (username: string) => {
    try {
      setIsLoading(true)
      const { data } = await assistanceService.getAllNeedHelpByUsername(username)
      setNeedHelpList(data)
      return data
    } catch (error) {
      throw new Error('Get all needHelp error')
    } finally {
      setIsLoading(false)
    }
  }

  const createNeedHelp = async (needHelp: INeedHelp) => {
    try {
      setIsLoading(true)
      const { data } = await assistanceService.createNeedHelp(needHelp)
      setNeedHelpList((prevNeedHelpList) =>
        prevNeedHelpList ? [...prevNeedHelpList, needHelp] : [needHelp]
      )
      showToast('success', t('volunteer.needHelp.send'), t('volunteer.needHelp.sendSuccess'))
      return data
    } catch (error: any) {
      if (error?.response) {
        const errorMessage = error.response.data.message
        showToast('error', t('volunteer.needHelp.send'), errorMessage)
      } else {
        showToast('error', t('volunteer.needHelp.send'), t('volunteer.needHelp.sendError'))
      }
      throw new Error('Create needHelp error')
    } finally {
      setIsLoading(false)
    }
  }

  const combinedHelpList = useMemo(() => {
    return [...(canHelpList || []), ...(needHelpList || [])]
  }, [canHelpList, needHelpList])

  const value = useMemo(
    () => ({
      isLoading: isLoading,
      charityList: charityList,
      volunteerList: volunteerList,
      lawyerList: lawyerList,
      lawList: lawList,
      locationList: locationList,
      canHelpList: canHelpList,
      needHelpList: needHelpList,
      combinedHelpList: combinedHelpList,
      getAllVolunteer: getAllVolunteer,
      getAllCharity: getAllCharity,
      getAllLawyer: getAllLawyer,
      getAllLaw: getAllLaw,
      getAllMapLocation: getAllMapLocation,
      getAllCanHelp: getAllCanHelp,
      createCanHelp: createCanHelp,
      getAllNeedHelp: getAllNeedHelp,
      createNeedHelp: createNeedHelp,
    }),
    [isLoading]
  )

  return <AssistanceContext.Provider value={value}>{children}</AssistanceContext.Provider>
}
