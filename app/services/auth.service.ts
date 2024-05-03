import http from '../api'

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
}

export default new AuthService()
