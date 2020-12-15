import React from 'react'
import {Switch, Route} from 'react-router-dom'

import {routes} from '../routes'

export const AppRouter = () => (
  <Switch>
    {routes.map(({path, Component}) => (
      <Route key={path} path={path} component={Component} />
    ))}
  </Switch>
)
