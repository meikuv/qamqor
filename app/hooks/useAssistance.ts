import { useContext } from 'react'
import { AssistanceContext } from '../providers/assistance'

export const useAssistance = () => useContext(AssistanceContext)
