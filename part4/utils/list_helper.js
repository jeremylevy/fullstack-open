const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum += blog.likes, 0)

const favoriteBlog = (blogs) => [...blogs].sort((blog1, blog2) => blog2.likes - blog1.likes)[0]

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}