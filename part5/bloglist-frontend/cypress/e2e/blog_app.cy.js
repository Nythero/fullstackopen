describe('blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      username: 'username',
      name: 'name',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Username')
    cy.contains('Password')
    cy.contains('Login')
  })

  describe('Login', function() {
    it('Succeeds with valid credentials', function() {
      cy.get('#username').type('username')
      cy.get('#password').type('password')
      cy.get('#login-button').click()

      cy.contains('name logged in')
      cy.get('.notificationSuccess').contains('logged in as username')
    })

    it('Fails with wrong credentials', function() {
      cy.get('#username').type('username2')
      cy.get('#password').type('password2')
      cy.get('#login-button').click()

      cy.get('.notificationError').contains('invalid username or password')
      cy.get('.notificationError').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      const credentials = {
	username: 'username',
	password: 'password'
      }
      cy.request('POST', 'http://localhost:3003/api/login', credentials)
        .then(response => {
          const jwt = JSON.stringify(response.body)
	  localStorage.setItem('loggedBlogUser', jwt)
	  cy.visit('http://localhost:3000')
	})
    }) 

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title-input').type('title')
      cy.get('#author-input').type('author')
      cy.get('#url-input').type('url')
      cy.contains('create').click()

      cy.get('.notificationSuccess').contains('added blog \'title\'')
      cy.contains('title - author')
    })

    describe('when there is a blog', function() {
      beforeEach(function() {
        cy.contains('new blog').click()
        cy.get('#title-input').type('title')
        cy.get('#author-input').type('author')
        cy.get('#url-input').type('url')
        cy.contains('create').click()
      })

      it('A blog can be liked', function () {
        cy.contains('title - author').contains('view').click()
        cy.contains('likes').contains('like').click()

        cy.contains('likes').contains('1')
      })
    })
  })
})
