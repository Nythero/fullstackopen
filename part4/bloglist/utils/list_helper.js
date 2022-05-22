const dummy = () => 1

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const isFavoriteBlog = (blog, blogs) => {
  return blogs.every(b => blog.likes >= b.likes)
}

const favoriteBlog = (blogs) => {
  return blogs.find(blog => isFavoriteBlog(blog, blogs))
}

const withoutRepeated = (array) => array.reduce((as, a) => (as.includes(a))? as : as.concat(a), [])

const authors = (blogs) => withoutRepeated(blogs.map(blog => blog.author))

const blogsQuantity = (a, blogs) => blogs.filter(b => b.author === a).length

const authorsWithBlogs = (blogs) => authors(blogs).map(a => ({ author: a, blogs: blogsQuantity(a, blogs) }))

const authorWithMoreBlogs = (a1, a2) => (a1.blogs > a2.blogs)? a1 : a2

const mostBlogs = (blogs) => {
  return authorsWithBlogs(blogs).reduce(authorWithMoreBlogs)
}

const likesQuantity = (author, blogs) =>
  blogs.reduce((likes, a) => likes + ((author === a.author)? a.likes : 0), 0)

const authorWithLikes = (blogs) => (a) => ({ author: a, likes: likesQuantity(a, blogs) })

const authorsWithLikes = (blogs) => authors(blogs).map(authorWithLikes(blogs))

const authorWithMoreLikes = (a1, a2) => (a1.likes > a2.likes)? a1 : a2

const mostLikes = (blogs) => {
  return authorsWithLikes(blogs).reduce(authorWithMoreLikes)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
