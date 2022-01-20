import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, waitFor, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import NewBlogForm from './NewBlogForm'

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

it('calls the event handler it received as props with the right details when a new blog is created', async () => {
  const addNewBlogMock = jest.fn(() => Promise.resolve())

  render( <NewBlogForm addNewBlog={addNewBlogMock} /> )

  const titleInput = screen.getByLabelText('title')
  const authorInput = screen.getByLabelText('author')
  const urlInput = screen.getByLabelText('url')

  const createBtn = screen.getByRole('button', {
    name: 'create'
  })

  user.type(titleInput, fixtures.blog.title)
  user.type(authorInput, fixtures.blog.author)
  user.type(urlInput, fixtures.blog.url)

  user.click(createBtn)

  await waitFor(() => {
    expect(addNewBlogMock).toHaveBeenCalledTimes(1)
    expect(addNewBlogMock).toHaveBeenCalledWith({
      title: fixtures.blog.title,
      author: fixtures.blog.author,
      url: fixtures.blog.url
    })

    expect(titleInput).toHaveValue('')
    expect(authorInput).toHaveValue('')
    expect(urlInput).toHaveValue('')
  })
})