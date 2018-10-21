import { sessionKeys, loadFromSession, saveToSession } from './session'

export const getAuthToken = () => {
  return loadFromSession(sessionKeys.main)
}
export const setAuthToken = token => {
  saveToSession(sessionKeys.main, token)
}
