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
	const blogData = {
	  title: 'title',
	  author: 'author',
	  url: 'url'
	}
	cy.createBlog(blogData)
      })

      it('A blog can be liked', function () {
        cy.contains('title - author').contains('view').click()
        cy.contains('likes').contains('like').click()

        cy.contains('likes').contains('1')
      })

      it('A blog can be deleted by the user who created it', function() {
        cy.contains('title - author').contains('view').click()
	cy.contains('remove').click()

        cy.get('html').should('not.contain', 'title - author')
      })

      it('A blog can\'t be deleted by other than the creator', function() {
        const user = {
          username: 'username2',
          name: 'name2',
          password: 'password2'
        }
        cy.request('POST', 'http://localhost:3003/api/users', user)
	cy.contains('Logout').click()
	
        const credentials = {
  	username: 'username2',
  	password: 'password2'
        }
        cy.request('POST', 'http://localhost:3003/api/login', credentials)
          .then(response => {
            const jwt = JSON.stringify(response.body)
  	  localStorage.setItem('loggedBlogUser', jwt)
  	  cy.visit('http://localhost:3000')
  	})

        cy.contains('title - author').contains('view').click()
	cy.contains('title - author').should('not.contain', 'remove')
      })

      it('Blogs are ordered by most likes', function() {
        const blogData2 = {
	  title: 'title2',
	  author: 'author2',
	  url: 'url2'
	}
	const blogData3 = {
	  title: 'title3',
	  author: 'author3',
	  url: 'url3'
	}
	cy.createBlog(blogData2)
	cy.createBlog(blogData3)

        cy.likeBlog({ title: 'title', author: 'author', likes: 0 })
	
	cy.likeBlog({ ...blogData2, likes: 0 })
	cy.likeBlog({ ...blogData2, likes: 1 })
	//This is needed because in my setup blog title3 randomly dissapears
	cy.visit('http://localhost:3000')
        cy.likeBlog({ ...blogData3, likes: 0 })
	cy.likeBlog({ ...blogData3, likes: 1 })
	cy.likeBlog({ ...blogData3, likes: 2 })

	//The .get('html') is needed because otherwise starts searching from title2
	//Only happens when running all the tests
        cy.get('html').get('.blog').eq(0).should('contain', 'title3 - author3')
        cy.get('html').get('.blog').eq(1).should('contain', 'title2 - author2')
	cy.get('html').get('.blog').eq(2).should('contain', 'title - author')
      })

    })
  })
})
