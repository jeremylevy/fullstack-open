import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

const fixtures = {}

fixtures.loggedUser = {
  username: 'root',
  name: 'root root',
  id: '61e3eb7cbf63dc8700810cec'
}

fixtures.blog = {
  title: 'blog_title',
  author: 'blog_author',
  url: 'blog_url',
  likes: 0,
  user: fixtures.loggedUser,
  id: '61e53c02320966d659f4d200'
}

test('renders title and author, but does not render its url or number of likes by default', () => {
  const blogComponent = render(
    <Blog loggedUser={fixtures.loggedUser} blog={fixtures.blog} />
  )

  expect(blogComponent.container).toHaveTextContent(fixtures.blog.title)
  expect(blogComponent.container).toHaveTextContent(fixtures.blog.author)

  expect(blogComponent.container).not.toHaveTextContent(fixtures.blog.url)
  expect(blogComponent.container).not.toHaveTextContent(`likes ${fixtures.blog.likes}`)
})