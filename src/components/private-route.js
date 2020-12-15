import React from 'react'
import PropTypes from 'prop-types'
import {Route, Redirect} from 'react-router-dom'

import {AuthContext} from '../contexts/auth-context'

export const PrivateRoute = ({children, ...rest}) => {
  const {isAuth} = React.useContext(AuthContext)

  return <Route {...rest}>{isAuth ? children : <Redirect to="/" />}</Route>
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
}
