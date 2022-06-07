import { useState } from 'react'
import blogService from '../services/blogs'
import populateBlog from '../utils/populateBlog'
import DeleteBlogButton from './DeleteBlogButton'
import PropTypes from 'prop-types'

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

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string,
    user: PropTypes.shape({
      id: PropTypes.any.isRequired,
      username: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      blogs: PropTypes.array.isRequired
    }),
    id: PropTypes.any.isRequired
  }).isRequired,
  user: PropTypes.shape({
    token: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  blogsState: PropTypes.array.isRequired
}

export default Blog
