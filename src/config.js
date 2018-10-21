import { sessionKeys, loadFromSession, saveToSession } from './lib/session'

export const GRAPHQL_SERVER_URL = 'http://localhost:4000'

export const getAuthToken = () => {
  return loadFromSession(sessionKeys.main)
}
export const setAuthToken = token => {
  saveToSession(sessionKeys.main, token)
}
