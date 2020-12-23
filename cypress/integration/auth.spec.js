const {cyan} = require('@material-ui/core/colors')

describe('login', () => {
  it('should display the invalid credentials error message', () => {
    cy.visit('/')

    cy.login({email: 'fake@mail.com', password: '123'})

    cy.findByText(/email or password incorrect/i)
  })

  it('should redirect the user to dashboard page after success login', () => {
    cy.visit('/')

    cy.login({email: 'john.doe@mail.com', password: '123'})

    cy.findByText(/dashboard/i)
  })
})

describe('logout', () => {
  it('should logout the user', () => {
    cy.visit('/')

    cy.login({email: 'john.doe@mail.com', password: '123'})

    cy.findByText(/dashboard/i)

    cy.findByRole('button', {name: /sign out/i}).click()

    cy.findByText(/login/i)
  })
})

describe('private access', () => {
  it('should redirect unauthenticated user to login page', () => {
    cy.visit('/dashboard')

    cy.findByText(/login/i)
  })
})
