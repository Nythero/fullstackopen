// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.contains('new blog').click()
  cy.get('#title-input').type(title)
  cy.get('#author-input').type(author)
  cy.get('#url-input').type(url)
  cy.contains('create').click()
  cy.contains('title - author')
})

Cypress.Commands.add('likeBlog', ({ title, author, likes }) => {
  const blog = title + ' - ' + author
  const newLikes = likes + 1
  cy.contains(blog).contains('view').click()
  cy.contains(blog).contains('likes').contains('like').click()
  cy.contains(blog).contains('likes ' + newLikes)
  cy.contains(blog).contains('hide').click()
  cy.contains(blog).contains('view')
})
