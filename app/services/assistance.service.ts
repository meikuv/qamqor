import http from '../api/index'

export interface IAssistance {
  id: number
  name: string
  typeKZ: string
  typeRU: string
  postUrl: string
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
  instagram: string
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

export interface ILawyer {
  id: number
  name: string
  photoUrl: string
  workExperience: number
  directRU: string
  directKZ: string
  contact: IContact
}

export interface ILaw {
  id: number
  type: string
  title: string
  lawArticles: ILawArticles[]
}

export interface ILawArticles {
  id: number
  title: string
  descriptions: ILawArticleDescription[]
}

export interface ILawArticleDescription {
  id: number
  title: string
}

class AssistanceService {
  async getAllCharity() {
    return http.get<IAssistance[]>('/assistance/charity/getAll')
  }

  async getAllVolunteer() {
    return http.get<IAssistance[]>('/assistance/volunteer/getAll')
  }

  async getAllLawyer() {
    return http.get<ILawyer[]>('/assistance/lawyer/getAll')
  }

  async getAllLaw() {
    return http.get<ILaw[]>('/assistance/law/getAll')
  }

  async searchAssistance(endPoint: string, name: string) {
    return http.get<any>(`/assistance/${endPoint}/search/${name}`)
  }
}

export default new AssistanceService()
