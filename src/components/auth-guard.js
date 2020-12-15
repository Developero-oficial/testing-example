import React from 'react'

import {AuthContext} from '../contexts/auth-context'

export const AuthGuard = ({children}) => {
  const [isAuth, setIsAuth] = React.useState(false)
  const [user, setUser] = React.useState({username: ''})

  const onLoginSuccess = React.useCallback(({username}) => {
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
