import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'

import {withAuthServices} from '../../hocs/with-auth-services'

const Login = ({loginService}) => {
  const [isFetching, setIsFetching] = React.useState(false)

  const handleSubmit = async e => {
    try {
      setIsFetching(true)
      e.preventDefault()
      const {email, password} = e.target.elements
      const response = await loginService({
        email: email.value,
        password: password.value,
      })

      if (response.status === 200) {
        // set auth
      }
    } catch (e) {
      console.log(e)
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

export const LoginPage = withAuthServices(Login)

Login.propTypes = {
  loginService: PropTypes.func.isRequired,
}
