import {rest} from 'msw'

const USERS_WHITE_LIST = {
  'john.doe@mail.com': 'John Doe',
}

export const handlers = [
  rest.post('/login', (req, res, ctx) => {
    const {email} = req.body

    if (USERS_WHITE_LIST[email]) {
      sessionStorage.setItem('is-authenticated', true)
      return res(
        ctx.status(200),
        ctx.json({user: {username: USERS_WHITE_LIST[email]}}),
      )
    }

    return res(
      ctx.status(401),
      ctx.json({
        errorMessage: 'Email or password incorrect',
      }),
    )
  }),

  rest.get('/user', (req, res, ctx) => {
    const isAuthenticated = sessionStorage.getItem('is-authenticated')

    if (!isAuthenticated) {
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: 'Not authorized',
        }),
      )
    }

    return res(
      ctx.status(200),
      ctx.json({
        username: 'admin',
      }),
    )
  }),
]