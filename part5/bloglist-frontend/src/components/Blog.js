import { useState } from 'react'
import blogService from '../services/blogs'
import populateBlog from '../utils/populateBlog'
import DeleteBlogButton from './DeleteBlogButton'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, handleLikeClick, handleDeleteClick }) => {
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
        <button onClick={handleLikeClick}>like</button>
        <br />
        {blog.user.name}
        <br />
        <DeleteBlogButton blog={blog} user={user} blogsState={handleDeleteClick} />
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
  blogsState: PropTypes.array.isRequired,
  handleLikeClick: PropTypes.func.isRequired,
  handleDeleteClick: PropTypes.func.isRequired
}

export default Blog
