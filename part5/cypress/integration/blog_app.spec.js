const user = {
  name: 'Jeremy Levy',
  username: 'jeremy',
  password: '123456'
}

const user2 = {
  name: 'John John',
  username: 'john',
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

    cy.createUser(user)

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

      cy.get('html').should('contain', `${user.name} logged in`)
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
      cy.login(user)
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

  describe('When logged in with a blog added', function() {
    beforeEach(function() {
      cy.login(user)
        .then(({ token }) => cy.createBlog(blog, token))
    })

    it('A blog can be liked', function() {
      cy.get('.blog:last').as('createdBlog')

      cy.get('@createdBlog')
        .contains('show')
        .click()

      cy.get('@createdBlog')
        .contains('like')
        .click()

      cy.get('.success')
        .should('be.visible')
        .should('contain', `${blog.title} by ${blog.author} liked`)

      cy.get('@createdBlog')
        .should('contain', `likes ${blog.likes + 1}`)
    })

    it('A blog can be deleted', function() {
      cy.get('.blog:last').as('createdBlog')

      cy.get('@createdBlog')
        .contains('show')
        .click()

      cy.get('@createdBlog')
        .contains('remove')
        .click()

      cy.get('.success')
        .should('be.visible')
        .should('contain', `${blog.title} by ${blog.author} deleted`)

      cy.get('@createdBlog')
        .should('not.exist')
    })

    it('A blog can only be deleted by its author', function() {
      cy.createUser(user2)
      cy.login(user2).then(({ token }) => cy.createBlog(blog, token))

      cy.login(user)

      cy.get('.blog:first').as('blogOfUser')
      cy.get('@blogOfUser')
        .should('be.visible')
        .contains('show')
        .click()
      cy.get('@blogOfUser')
        .should('contain', 'remove')

      cy.get('.blog:last').as('blogOfOtherUser')
      cy.get('@blogOfOtherUser')
        .should('be.visible')
        .contains('show')
        .click()
      cy.get('@blogOfOtherUser')
        .should('not.contain', 'remove')
    })
  })

  describe('When logged in with many blogs added', function () {
    beforeEach(function() {
      cy.login(user)
        .then(({ token }) => {
          cy.createBlog(blog, token)
          cy.createBlog(blog, token)
        })
    })

    it('Blogs are sorted by likes', function() {
      cy.get('.blog')
        .should('have.length', 2)

      cy.get('.blog:last')
        .as('lastBlog')
      cy.get('@lastBlog')
        .contains('show')
        .click()
      cy.get('@lastBlog')
        .contains('like')
        .click()

      cy.get('@lastBlog').then($lastBlog => {
        cy.get('.blog:first').should($firstBlog => {
          expect($lastBlog.is($firstBlog)).to.equal(true)
        })
      })
    })
  })
})