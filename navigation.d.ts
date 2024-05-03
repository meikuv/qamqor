import { TypeRootStackParamList } from './app/navigations/types'

declare global {
  namespace ReactNavigation {
    interface RootParamList extends TypeRootStackParamList {}
  }
}
