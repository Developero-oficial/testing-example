import React from 'react'
import {Switch, Route} from 'react-router-dom'

import {routes} from '../routes'
import {PrivateRoute} from './private-route'

export const AppRouter = () => {
  return (
    <Switch>
      {routes.map(({path, Component, isPrivate, isExact}) => {
        const RouteToUse = isPrivate ? PrivateRoute : Route
        return (
          <RouteToUse key={path} path={path} exact={isExact}>
            <Component />
          </RouteToUse>
        )
      })}
    </Switch>
  )
}
