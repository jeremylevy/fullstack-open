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
Cypress.Commands.add('login', (user) => (
  cy.request('POST', 'http://localhost:3003/api/login', user)
    .its('body')
    .then(loginReqResp => {
      cy.window()
        .its('localStorage')
        .invoke('setItem', 'user', JSON.stringify(loginReqResp))

      cy.reload()

      return cy.wrap(loginReqResp)
    })
))

Cypress.Commands.add('createUser', (user) => {
  cy.request('POST', 'http://localhost:3003/api/users/', user)
    .then(createUser => cy.wrap(createUser))
})

Cypress.Commands.add('createBlog', (blog, userToken) => (
  cy.request({
    method: 'POST',
    url: 'http://localhost:3003/api/blogs/',
    body: blog,
    auth: {
      bearer: userToken
    }
  })
    .its('body')
    .then(createdBlog => cy.wrap(createdBlog))
))