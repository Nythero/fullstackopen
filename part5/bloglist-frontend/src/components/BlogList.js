import Blog from './Blog'

const sortingBlogsFunction = (b1, b2) => {
  if(b1.likes > b2.likes)
    return -1
  else if (b2.likes > b1.likes)
    return 1
  else
    return 0
}

const handleLikeClick = (blog, blogsState) => async () => {
  const { id } = blog
  const blogData = await blogDataFrom(blog)
  try {
    const blogResponse = await blogService.put(id, blogData)
    const updatedBlog = await populateBlog(blogResponse)
    const [blogs, setBlogs] = blogsState
    const blogsWithoutBlog = blogs.filter(b => b.id !== id)

    const blogsWithUpdatedBlog = blogsWithoutBlog.concat(updatedBlog)
    setBlogs(blogsWithUpdatedBlog)
  }
  catch(err) {
    console.log(err)
  }
}

const handleDeleteClick = (blog, blogsState) => async () => {
  const id = blog.id
  if(!window.confirm(`Remove blog ${blog.title} by ${blog.author}`))
    return
  try {
    await blogService.remove(id)
    const [blogs, setBlogs] = blogsState
    const blogsWithoutRemovedBlog = blogs.filter(b => b.id !== id)
    setBlogs(blogsWithoutRemovedBlog)
  }
  catch(err) {
    console.log(err)
  }
}

const BlogList = ({ blogsState, user }) => {
  const [blogs] = blogsState
  const blogComponent = blog => <Blog 
    key={blog.id}
    handleLikeClick={handleLikeClick(blog, blogsState)}
    handleDeleteClick={handleDeleteClick(blog, blogsState)}
    user={user}/>
  
  const sortedBlogs = blogs.sort(sortingBlogsFunction)
  return sortedBlogs.map(blogComponent)
}

export default BlogList
