const tokenKey = 'some-auth-token'

export const setToken = (token: string) => localStorage.setItem(tokenKey, token)

export const getToken = () => localStorage.getItem(tokenKey)

export const getTokenExist = () => !!getToken()

export const deleteToken = () => localStorage.removeItem(tokenKey)
