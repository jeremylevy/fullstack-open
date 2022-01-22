import React, { useState } from 'react'

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

      <form onSubmit={handleNewBlogSubmit}>
        <div>
          <label htmlFor="newBlogTitle">title</label>
          <input
            id="newBlogTitle"
            type="text"
            value={newBlogTitle}
            name="newBlogTitle"
            onChange={({ target }) => setNewBlogTitle(target.value)}
          />
        </div>

        <div>
          <label htmlFor="newBlogAuthor">author</label>
          <input
            id="newBlogAuthor"
            type="text"
            value={newBlogAuthor}
            name="newBlogAuthor"
            onChange={({ target }) => setNewBlogAuthor(target.value)}
          />
        </div>

        <div>
          <label htmlFor="newBlogUrl">url</label>
          <input
            id="newBlogUrl"
            type="text"
            value={newBlogUrl}
            name="newBlogUrl"
            onChange={({ target }) => setNewBlogUrl(target.value)}
          />
        </div>

        <button id="newBlogCreateBtn" type="submit">create</button>
      </form>
    </div>
  )
}

export default NewBlogForm