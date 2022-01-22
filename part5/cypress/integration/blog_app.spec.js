const user = {
  name: 'Jeremy Levy',
  username: 'jeremy',
  password: '123456'
}

const blog = {
  title: 'blog_title',
  author: 'blog_author',
  likes: 0,
  url: 'blog_url'
}

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    cy.request('POST', 'http://localhost:3003/api/users/', user)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.get('form').should('have.class', 'loginForm')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('input[name="Username"]').type(user.username)
      cy.get('input[name="Password"]').type(user.password)

      cy.get('button[type="submit"]').click()

      cy.contains(`${user.name} logged in`)
    })

    it('fails with wrong credentials', function() {
      cy.get('input[name="Username"]').type(user.username)
      cy.get('input[name="Password"]').type('bad')

      cy.get('button[type="submit"]').click()

      cy.get('.error')
        .should('contain', 'Invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', `${user.name} logged in`)
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login', user)
        .then(response => {
          localStorage.setItem('user', JSON.stringify(response.body))
          cy.visit('http://localhost:3000')
        })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()

      cy.get('#newBlogTitle').type(blog.title)
      cy.get('#newBlogAuthor').type(blog.author)
      cy.get('#newBlogUrl').type(blog.url)

      cy.get('#newBlogCreateBtn').click()

      cy.get('.success')
        .should('contain', `a new blog ${blog.title} by ${blog.author} added`)

      cy.get('.blog:last')
        .should('contain', blog.title)
        .and('contain', blog.author)
    })
  })
})