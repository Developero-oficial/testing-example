import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'

import {AppRouter} from './components/app-router'
import {AuthGuard} from './components/auth-guard'

const App = () => (
  <AuthGuard>
    <Router>
      <AppRouter />
    </Router>
  </AuthGuard>
)

export default App
