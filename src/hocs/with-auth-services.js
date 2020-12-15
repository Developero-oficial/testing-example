import React from 'react'

import {login} from '../services/auth-services'

export const withAuthServices = Component => {
  const ComponentWithServices = props => {
    return <Component loginService={login} {...props} />
  }

  return ComponentWithServices
}
