import { Platform } from 'react-native'

export const shadowLevel = Platform.OS === 'android' ? 'shadow-gray-600' : 'shadow-gray-200'
