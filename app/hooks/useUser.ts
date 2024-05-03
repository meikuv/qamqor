import { useContext } from 'react'
import { UserContext } from '../providers/user'

export const useUser = () => useContext(UserContext)
