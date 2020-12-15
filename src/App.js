import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'

import {AppRouter} from './components/app-router'

const App = () => (
  <Router>
    <AppRouter />
  </Router>
)

export default App
