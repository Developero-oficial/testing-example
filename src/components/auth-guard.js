import React from 'react'

import {AuthContext} from '../contexts/auth-context'
import {decodeJwt} from '../utils/jwt-utils'
import {setItem} from '../utils/storage-utils'

export const AuthGuard = ({children}) => {
  const [isAuth, setIsAuth] = React.useState(false)
  const [user, setUser] = React.useState({username: ''})

  const onLoginSuccess = React.useCallback(({token}) => {
    const {username} = decodeJwt(token)
    setItem({key: '@token', value: token})
    setIsAuth(true)
    setUser({username})
  }, [])

  const authContextValues = {
    isAuth,
    user,
    onLoginSuccess,
  }

  return (
    <AuthContext.Provider value={authContextValues}>
      {children}
    </AuthContext.Provider>
  )
}
