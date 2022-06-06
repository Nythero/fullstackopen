import Blog from './Blog'

const blogComponent = blogsState => blog => {
  return <Blog key={blog.id} blog={blog} blogsState={blogsState}/>
}

const BlogList = ({ blogsState }) => {
  const [blogs] = blogsState
  return blogs.map(blogComponent(blogsState))
}

export default BlogList
