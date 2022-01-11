const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum += blog.likes, 0)

const favoriteBlog = (blogs) => [...blogs].sort((blog1, blog2) => blog2.likes - blog1.likes)[0]

const mostBlogs = (blogs) => {
  const authorsNbOfBlogs = {}
  let authorWithMostBlogs = undefined

  blogs.forEach(blog => {
    authorsNbOfBlogs[blog.author] = blog.author in authorsNbOfBlogs
      ? authorsNbOfBlogs[blog.author] + 1
      : 1

    if (!authorWithMostBlogs || authorWithMostBlogs.blogs < authorsNbOfBlogs[blog.author]) {
      authorWithMostBlogs = {
        author: blog.author,
        blogs: authorsNbOfBlogs[blog.author]
      }
    }
  })

  return authorWithMostBlogs
}

const mostLikes = (blogs) => {
  const authorsNbOfLikes = {}
  let authorWithMostLikes = undefined

  blogs.forEach(blog => {
    authorsNbOfLikes[blog.author] = blog.author in authorsNbOfLikes
      ? authorsNbOfLikes[blog.author] + blog.likes
      : blog.likes

    if (!authorWithMostLikes || authorWithMostLikes.likes < authorsNbOfLikes[blog.author]) {
      authorWithMostLikes = {
        author: blog.author,
        likes: authorsNbOfLikes[blog.author]
      }
    }
  })

  return authorWithMostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}