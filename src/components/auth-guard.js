import React from 'react'
import jwt_decode from 'jwt-decode'

import {AuthContext} from '../contexts/auth-context'

export const AuthGuard = ({children}) => {
  const [isAuth, setIsAuth] = React.useState(false)
  const [user, setUser] = React.useState({username: ''})

  const onLoginSuccess = React.useCallback(({token}) => {
    const {username} = jwt_decode(token)
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
