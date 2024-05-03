import http from '../api'

export interface IUser {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  photoUrl: string
  phoneNumber: string
}

export interface IVideo {
  id: number
  title: string
  videoName: string
  videoUrl: string
}

export interface IChangePassword {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

class UserService {
  async connectedUser() {
    return await http.get<IUser>('/auth/user/connected-user')
  }

  async updateUser(user: IUser) {
    return await http.post('/auth/user/profile-update', user)
  }

  async uploadImage(uri: string) {
    const uriComponents = uri.split('/')
    const filename = uriComponents[uriComponents.length - 1]
    console.log(filename)

    const formData = new FormData()
    formData.append('file', {
      uri,
      name: filename,
      type: 'image/jpeg',
    })
    return await http.post<IUser>('/auth/user/upload-image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  }

  async logout() {
    return await http.post('/auth/user/logout')
  }

  async changePassword(passwords: IChangePassword) {
    return await http.post('/auth/user/change-password', passwords)
  }
}

export default new UserService()
