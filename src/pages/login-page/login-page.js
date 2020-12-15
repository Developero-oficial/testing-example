import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'

import {loginService} from '../../services/auth-services'
import {AuthContext} from '../../contexts/auth-context'

export const LoginPage = () => {
  const [isFetching, setIsFetching] = React.useState(false)
  const [errorMsg, setErrorMsg] = React.useState('')
  const {onLoginSuccess} = React.useContext(AuthContext)

  const handleSubmit = async e => {
    try {
      e.preventDefault()
      setIsFetching(true)
      const {email, password} = e.target.elements

      const response = await loginService({
        email: email.value,
        password: password.value,
      })

      if (response.status === 200) {
        onLoginSuccess(response.data.user)
      }
    } catch (error) {
      if (error.response) {
        const {errorMessage} = error.response.data
        return setErrorMsg(errorMessage)
      }

      setErrorMsg('Unexpected error. Please refresh the browser and try again')
    } finally {
      setIsFetching(false)
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box mt={6}>
        <Box mb={3}>
          <Typography component="h1" variant="h5" align="center">
            Login
          </Typography>
        </Box>

        {errorMsg && (
          <Box my={3}>
            <Typography align="center" color="error">
              {errorMsg}
            </Typography>
          </Box>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <Box my={3}>
            <Button
              disabled={isFetching}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Send
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  )
}
