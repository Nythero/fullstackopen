import blogService from '../services/blogs'

const handleClick = (blog, blogsState) => async () => {
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

const DeleteBlogButton = ({ blog, user, blogsState }) => {
  if(user === null)
    return null
  const blogCreatorUsername = blog.user.username
  const userUsername = user.username
  if(blogCreatorUsername === userUsername)
    return <button onClick={handleClick(blog, blogsState)} >remove</button>
  return null
}

export default DeleteBlogButton
