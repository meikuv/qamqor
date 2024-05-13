import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { AuthProvider } from './app/providers/auth'
import { I18nProvider } from './app/providers/i18n'
import { UserProvider } from './app/providers/user'
import { AssistanceProvider } from './app/providers/assistance'
import Navigation from './app/navigations'
import Toast from 'react-native-toast-message'
import 'react-native-gesture-handler'

export default function App() {
  return (
    <AuthProvider>
      <I18nProvider>
        <UserProvider>
          <AssistanceProvider>
            <SafeAreaProvider>
              <Navigation />
              <Toast />
              <StatusBar style="auto" />
            </SafeAreaProvider>
          </AssistanceProvider>
        </UserProvider>
      </I18nProvider>
    </AuthProvider>
  )
}
