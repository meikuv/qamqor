import http from '../api'
import { ICredentials } from './token.service'

class AuthService {
  async login(username: string, password: string) {
    return http.post('/auth/account/login', { username, password })
  }

  async register(username: string, email: string, password: string) {
    return http.post('/auth/account/register', { username, email, password })
  }

  async verification(email: string, code: string) {
    return http.post('/auth/account/verify', { email, code })
  }

  async refreshToken(token: string | undefined) {
    return http.post<ICredentials>('/auth/account/refresh-token', {
      token,
    })
  }
}

export default new AuthService()
