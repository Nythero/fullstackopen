import Blog from './Blog'

const blogComponent = blog => <Blog key={blog.id} blog={blog} />

const BlogList = ({ blogsState }) => {
  const [blogs] = blogsState
  return blogs.map(blogComponent)
}

export default BlogList
