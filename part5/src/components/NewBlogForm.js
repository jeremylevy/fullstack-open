import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const NewBlogForm = ({ addNewBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const handleNewBlogSubmit = async (event) => {
    event.preventDefault()

    await addNewBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    })

    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }

  return (
    <div>
      <h2>create new</h2>

      <Form onSubmit={handleNewBlogSubmit}>
        <Form.Group>
          <Form.Label>title</Form.Label>
          <Form.Control
            id="newBlogTitle"
            type="text"
            value={newBlogTitle}
            name="newBlogTitle"
            onChange={({ target }) => setNewBlogTitle(target.value)}
          />
          <Form.Label>author</Form.Label>
          <Form.Control
            id="newBlogAuthor"
            type="text"
            value={newBlogAuthor}
            name="newBlogAuthor"
            onChange={({ target }) => setNewBlogAuthor(target.value)}
          />
          <Form.Label>url</Form.Label>
          <Form.Control
            id="newBlogUrl"
            type="text"
            value={newBlogUrl}
            name="newBlogUrl"
            onChange={({ target }) => setNewBlogUrl(target.value)}
          />
          <Button id="newBlogCreateBtn" type="submit">
            create
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default NewBlogForm