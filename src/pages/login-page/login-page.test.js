import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {screen, render, fireEvent, waitFor} from '@testing-library/react'
import {rest} from 'msw'
import {setupServer} from 'msw/node'

import {LoginPage} from './'
import {AuthGuard} from '../../components/auth-guard'

const server = setupServer(
  rest.post('/login', (req, res, ctx) => {
    return res(
      ctx.status(401),
      ctx.json({
        errorMessage: 'Email or password incorrect',
      }),
    )
  }),
)

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

beforeEach(() =>
  render(
    <Router>
      <AuthGuard>
        <LoginPage />
      </AuthGuard>
    </Router>,
  ),
)

test('login title', () => {
  expect(screen.queryByText(/login/i)).toBeInTheDocument()
})

test('email is required', () => {
  expect(screen.queryByText(/the email is required/i)).not.toBeInTheDocument()

  const submitBtn = screen.getByRole('button', {name: /send/i})
  fireEvent.click(submitBtn)

  expect(screen.queryByText(/the email is required/i)).toBeInTheDocument()
})

test('email is valid', () => {
  expect(
    screen.queryByText(
      /the email is not valid. Use the format username@mail.com/i,
    ),
  ).not.toBeInTheDocument()

  screen.getByLabelText(/email/i).value = 'invalid.email'

  const submitBtn = screen.getByRole('button', {name: /send/i})
  fireEvent.click(submitBtn)

  expect(
    screen.queryByText(
      /the email is not valid. Use the format username@mail.com/i,
    ),
  ).toBeInTheDocument()
})

test('password is required', () => {
  expect(
    screen.queryByText(/the password is required/i),
  ).not.toBeInTheDocument()

  const submitBtn = screen.getByRole('button', {name: /send/i})
  fireEvent.click(submitBtn)

  expect(screen.queryByText(/the password is required/i)).toBeInTheDocument()
})

test('failed login: invalid credentials', async () => {
  expect(
    screen.queryByText(/email or password incorrect/i),
  ).not.toBeInTheDocument()

  screen.getByLabelText(/email/i).value = 'test@mail.com'
  screen.getByLabelText(/password/i).value = 'pass'

  const submitBtn = screen.getByRole('button', {name: /send/i})
  fireEvent.click(submitBtn)

  expect(
    await screen.findByText(/email or password incorrect/i),
  ).toBeInTheDocument()
})

test('success login', async () => {
  const jwt =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

  server.use(
    rest.post('/login', (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          user: {token: jwt},
        }),
      )
    }),
  )

  screen.getByLabelText(/email/i).value = 'test@mail.com'
  screen.getByLabelText(/password/i).value = 'pass'

  const submitBtn = screen.getByRole('button', {name: /send/i})
  fireEvent.click(submitBtn)

  await waitFor(() =>
    expect(screen.queryByText(/login/i)).not.toBeInTheDocument(),
  )
})
