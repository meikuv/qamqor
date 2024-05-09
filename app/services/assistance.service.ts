import http from '../api/index'

export interface IAssistance {
  id: number
  name: string
  typeKZ: string
  typeRU: string
  photoUrl: string
  descriptionKZ: string
  descriptionRU: string
  contact: IContact
  directions: IDirection[]
  requisites: IRequisites[]
  phoneNumbers: IPhoneNumbers[]
  locations: ILocations[]
}

export interface IContact {
  id: number
  address: string
  phone: string
  email: string
  websiteUrl: string
}

export interface IDirection {
  id: number
  titleKZ: string
  titleRU: string
}

export interface IPhoneNumbers {
  id: number
  personName: string
  phoneNumber: string
}

export interface ILocations {
  id: number
  name: string
  location: string
  email: string
  phone: string
}

export interface IRequisites {
  id: number
  respondent: string
  accountNumber: string
  onlinePaymentUrl: string
  currency: string
}

class AssistanceService {
  async getAllCharity() {
    return http.get<IAssistance[]>('/assistance/charity/getAll')
  }

  async getAllVolunteer() {
    return http.get<IAssistance[]>('/assistance/volunteer/getAll')
  }
}

export default new AssistanceService()
