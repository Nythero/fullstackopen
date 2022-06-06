import { useState } from 'react'
import blogService from '../services/blogs'
import populateBlog from '../utils/populateBlog'
import DeleteBlogButton from './DeleteBlogButton'

const blogDataFrom = async (blog) => {
  const { title, author, url, likes, user } = blog
  return {
    title,
    author,
    url,
    likes: likes + 1,
    user: user.id
  }
}

const like = (blog, blogsState) => async () => {
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

const Blog = ({ blog, blogsState, user }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => setVisible(!visible)

  if(visible) {
    return (
      <div>
        {blog.title} - {blog.author}
        <button onClick={toggleVisibility}>hide</button>
        <br />
        {blog.url}
        <br />
        likes {blog.likes}
        <button onClick={like(blog, blogsState)}>like</button>
        <br />
        {blog.user.name}
        <br />
        <DeleteBlogButton blog={blog} user={user} blogsState={blogsState} />
      </div>
    )
  }
  return (
    <div>
      {blog.title} - {blog.author}
      <button onClick={toggleVisibility}>view</button>
    </div>
  )
}

export default Blog
