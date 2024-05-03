import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { AuthProvider } from './app/providers/auth'
import { I18nProvider } from './app/providers/i18n'
import { UserProvider } from './app/providers/user'
import { AssistanceProvider } from './app/providers/assistance'
import Navigation from './app/navigations'
import Toast from 'react-native-toast-message'

export default function App() {
  return (
    <I18nProvider>
      <AuthProvider>
        <UserProvider>
          <AssistanceProvider>
            <SafeAreaProvider>
              <Navigation />
              <Toast />
              <StatusBar style="auto" />
            </SafeAreaProvider>
          </AssistanceProvider>
        </UserProvider>
      </AuthProvider>
    </I18nProvider>
  )
}
