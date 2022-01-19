import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
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

test('url and number of likes are shown when the button controlling the shown details has been clicked', () => {
  const blogComponent = render(
    <Blog loggedUser={fixtures.loggedUser} blog={fixtures.blog} />
  )

  const showDetailsBtn = blogComponent.getByText('show')
  fireEvent.click(showDetailsBtn)

  expect(blogComponent.container).toHaveTextContent(fixtures.blog.url)
  expect(blogComponent.container).toHaveTextContent(`likes ${fixtures.blog.likes}`)
})

test('if the like button is clicked twice, the \'handleBlogLike\' function is called twice', () => {
  const handleBlogLikeMock = jest.fn()

  const blogComponent = render(
    <Blog
      loggedUser={fixtures.loggedUser}
      blog={fixtures.blog}
      handleBlogLike={handleBlogLikeMock}
    />
  )

  // we must click on the 'show' button
  // to display the 'like' button
  const showDetailsBtn = blogComponent.getByText('show')
  fireEvent.click(showDetailsBtn)

  const likeBtn = blogComponent.getByText('like')
  fireEvent.click(likeBtn)
  fireEvent.click(likeBtn)

  expect(handleBlogLikeMock.mock.calls).toHaveLength(2)
})