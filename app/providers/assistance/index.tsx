import React, { createContext, useMemo, useState, FC, ReactNode } from 'react'
import assistanceService, {
  IAssistance,
  ICanHelp,
  ILaw,
  ILawyer,
  IMapLocation,
  IMedical,
  INeedHelp,
  IReview,
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
  medicalList: IMedical[] | undefined
  getAllCharity: () => Promise<IAssistance[] | undefined>
  getAllVolunteer: () => Promise<IAssistance[] | undefined>
  getAllLawyer: () => Promise<ILawyer[] | undefined>
  getAllLaw: () => Promise<ILaw[] | undefined>
  getAllMapLocation: () => Promise<IMapLocation[] | undefined>
  getAllCanHelp: (username: string) => Promise<ICanHelp[] | undefined>
  createCanHelp: (canHelp: ICanHelp) => Promise<any>
  getAllNeedHelp: (username: string) => Promise<INeedHelp[] | undefined>
  getAllMedical: () => Promise<IMedical[] | undefined>
  createReview: (review: IReview) => Promise<any>
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
  const [medicalList, setMedicalList] = useState<IMedical[]>()
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
      showToast('success', t('volunteer.canHelp.title'), t('volunteer.canHelp.sendSuccess'))
      return data
    } catch (error: any) {
      if (error?.response) {
        const errorMessage = error.response.data.message
        showToast('error', t('volunteer.canHelp.title'), errorMessage)
      } else {
        showToast('error', t('volunteer.canHelp.title'), t('volunteer.canHelp.sendError'))
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
      showToast('success', t('volunteer.needHelp.title'), t('volunteer.needHelp.sendSuccess'))
      return data
    } catch (error: any) {
      if (error?.response) {
        const errorMessage = error.response.data.message
        showToast('error', t('volunteer.needHelp.title'), errorMessage)
      } else {
        showToast('error', t('volunteer.needHelp.title'), t('volunteer.needHelp.sendError'))
      }
      throw new Error('Create needHelp error')
    } finally {
      setIsLoading(false)
    }
  }

  const createReview = async (review: IReview) => {
    try {
      setIsLoading(true)
      const { data } = await assistanceService.createReview(review)
      showToast('success', t('leaveReview.title'), t('volunteer.needHelp.sendSuccess'))
      return data
    } catch (error: any) {
      if (error?.response) {
        const errorMessage = error.response.data.message
        showToast('error', t('leaveReview.title'), errorMessage)
      } else {
        showToast('error', t('leaveReview.title'), t('volunteer.needHelp.sendError'))
      }
      throw new Error('Create needHelp error')
    } finally {
      setIsLoading(false)
    }
  }

  const getAllMedical = async () => {
    try {
      setIsLoading(true)
      const { data } = await assistanceService.getAllMedical()
      setMedicalList(data)
      return data
    } catch (error) {
      throw new Error('Get all medical error')
    } finally {
      setIsLoading(false)
    }
  }

  const combinedHelpList = useMemo(() => {
    return [...(canHelpList || []), ...(needHelpList || [])].sort((a, b) => {
      const dateA = new Date(a.createdAt)
      const dateB = new Date(b.createdAt)
      return dateB.getTime() - dateA.getTime()
    })
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
      medicalList: medicalList,
      getAllVolunteer: getAllVolunteer,
      getAllCharity: getAllCharity,
      getAllLawyer: getAllLawyer,
      getAllLaw: getAllLaw,
      getAllMapLocation: getAllMapLocation,
      getAllCanHelp: getAllCanHelp,
      createCanHelp: createCanHelp,
      getAllNeedHelp: getAllNeedHelp,
      createNeedHelp: createNeedHelp,
      createReview: createReview,
      getAllMedical: getAllMedical,
    }),
    [isLoading]
  )

  return <AssistanceContext.Provider value={value}>{children}</AssistanceContext.Provider>
}
