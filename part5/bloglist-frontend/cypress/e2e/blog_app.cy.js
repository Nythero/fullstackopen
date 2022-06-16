describe('blog app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      username: 'username',
      name: 'name',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', () => {
    cy.contains('Username')
    cy.contains('Password')
    cy.contains('Login')
  })

  describe('Login', () => {
    it('Succeeds with valid credentials', () => {
      cy.get('#username').type('username')
      cy.get('#password').type('password')
      cy.get('#login-button').click()

      cy.contains('name logged in')
      cy.get('.notificationSuccess').contains('logged in as username')
    })

    it('Fails with wrong credentials', () => {
      cy.get('#username').type('username2')
      cy.get('#password').type('password2')
      cy.get('#login-button').click()

      cy.get('.notificationError').contains('invalid username or password')
      cy.get('.notificationError').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

})
