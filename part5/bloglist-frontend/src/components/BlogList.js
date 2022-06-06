import Blog from './Blog'

const blogComponent = (blogsState, user) => blog => {
  return <Blog key={blog.id} blog={blog} blogsState={blogsState} user={user}/>
}

const sortingBlogsFunction = (b1, b2) => {
  if(b1.likes > b2.likes)
    return -1
  else if (b2.likes > b1.likes)
    return 1
  else
    return 0
}

const BlogList = ({ blogsState, user }) => {
  const [blogs] = blogsState
  const sortedBlogs = blogs.sort(sortingBlogsFunction)
  return sortedBlogs.map(blogComponent(blogsState, user))
}

export default BlogList
