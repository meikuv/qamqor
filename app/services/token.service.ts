import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

export interface ICredentials {
  accessToken: string
  refreshToken: string
  message: string
}

class TokenService {
  async setCredentials(credentials: ICredentials) {
    try {
      await AsyncStorage.setItem('credentials', JSON.stringify(credentials))
    } catch (error) {
      console.log('Error setting credentials in AsyncStorage: ', error)
    }
  }

  async getCredentials(): Promise<ICredentials | null> {
    try {
      const credentialsObject = await AsyncStorage.getItem('credentials')
      const credentials: ICredentials | null = credentialsObject
        ? JSON.parse(credentialsObject)
        : null
      return credentials
    } catch (error) {
      console.log('Error getting credentials from AsyncStorage: ', error)
      return null
    }
  }

  async clearCredentials() {
    try {
      await AsyncStorage.removeItem('credentials')
      console.log('AsyncStorage cleared successfully.')
    } catch (error) {
      console.error('Error clearing data from AsyncStorage:', error)
    }
  }

  async getLocalAccessToken(): Promise<string | undefined> {
    const credentials = await this.getCredentials()
    return credentials?.accessToken
  }

  async getLocalRefreshToken(): Promise<string | undefined> {
    const credentials = await this.getCredentials()
    return credentials?.refreshToken
  }

  async refreshAccessToken(): Promise<string | null> {
    const refreshToken = await this.getLocalRefreshToken()

    try {
      const { data } = await axios.get<ICredentials>('/auth/account/refresh-token', {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      })
      await this.setCredentials(data)
      return data.accessToken
    } catch (error) {
      return null
    }
  }
}

export default new TokenService()
