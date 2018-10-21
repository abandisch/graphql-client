
export const sessionKeys = {
  main: 'gql-tute'
}

export const saveToSession = (key, item) => {
  window.sessionStorage.setItem(key, item)
}

export const loadFromSession = key => {
  window.sessionStorage.getItem(key)
}
