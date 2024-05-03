import AsyncStorage from '@react-native-async-storage/async-storage'

class LangService {
  async setLanguageCode(code: string) {
    try {
      await AsyncStorage.setItem('langCode', code)
      console.log(code)
    } catch (error) {
      console.error('Error storing language code:', error)
    }
  }

  async getLanguageCode() {
    try {
      const langCode = await AsyncStorage.getItem('langCode')
      console.log(langCode)
      return langCode
    } catch (error) {
      console.error('Error retrieving language code:', error)
    }
  }
}

export default new LangService()
