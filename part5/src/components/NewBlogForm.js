import React from 'react'

const NewBlogForm = ({
  handleNewBlogSubmit,
  newBlogTitle,
  setNewBlogTitle,
  newBlogAuthor,
  setNewBlogAuthor,
  newBlogUrl,
  setNewBlogUrl
}) => {
  return (
    <div>
      <h2>create new</h2>

      <form onSubmit={handleNewBlogSubmit}>
        <div>
          title
            <input
            type="text"
            value={newBlogTitle}
            name="new_blog_title"
            onChange={({ target }) => setNewBlogTitle(target.value)}
          />
        </div>
        
        <div>
          author
            <input
            type="text"
            value={newBlogAuthor}
            name="new_blog_author"
            onChange={({ target }) => setNewBlogAuthor(target.value)}
          />
        </div>
        
        <div>
          url
            <input
            type="text"
            value={newBlogUrl}
            name="new_blog_url"
            onChange={({ target }) => setNewBlogUrl(target.value)}
          />
        </div>
        
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default NewBlogForm