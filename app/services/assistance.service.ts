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

export interface IMapLocation {
  id: number
  type: string
  locationName: string
  locationAddress: string
  latitude: number
  longitude: number
}

export interface ICanHelp {
  id: number
  type: string
  organization: string
  username: string
  firstName: string
  lastName: string
  email: string
  age: number
  motivation: string
  phoneNumber: string
  createdAt: Date
}

export interface INeedHelp {
  id: number
  type: string
  organization: string
  username: string
  fullName: string
  supportType: string
  expand: string
  phoneNumber: string
  createdAt: Date
}

export interface IReview {
  username: string
  firstName: string
  lastName: string
  email: string
  rating: number
  comment: string
}

export interface IMedical {
  id: number
  name: string
  photoUrl: string
  address: string
  phone: string
  descriptionKZ: string
  descriptionRU: string
  websiteUrl: string
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

  async getAllMapLocation() {
    return http.get<IMapLocation[]>('/assistance/map-location/getAll')
  }

  async getAllCanHelpByUsername(username: string) {
    return http.get<ICanHelp[]>(`/assistance/help/getAllCanHelp/${username}`)
  }

  async createCanHelp(canHelp: ICanHelp) {
    return http.post('/assistance/help/createCanHelp', canHelp)
  }

  async deleteCanHelp(id: number) {
    return http.delete(`/assistance/help/deleteCanHelp/${id}`)
  }

  async getAllNeedHelpByUsername(username: string) {
    return http.get<INeedHelp[]>(`/assistance/help/getAllNeedHelp/${username}`)
  }

  async createNeedHelp(needHelp: INeedHelp) {
    return http.post('/assistance/help/createNeedHelp', needHelp)
  }

  async deleteNeedHelp(id: number) {
    return http.delete(`/assistance/help/deleteNeedHelp/${id}`)
  }

  async createReview(review: IReview) {
    return http.post('/assistance/help/createReview', review)
  }

  async getAllMedical() {
    return http.get<IMedical[]>('/assistance/medical/getAll')
  }

  async searchAssistance(endPoint: string, name: string) {
    return http.get<any>(`/assistance/${endPoint}/search/${name}`)
  }
}

export default new AssistanceService()
