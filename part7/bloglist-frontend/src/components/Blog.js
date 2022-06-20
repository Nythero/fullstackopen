import { useState } from 'react'
import DeleteBlogButton from './DeleteBlogButton'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLikeClick, handleDeleteClick }) => {
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
        <DeleteBlogButton
          blog={blog}
          handleDeleteClick={handleDeleteClick} />
      </div>
    )
  }
  return (
    <div className='blog'>
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
      name: PropTypes.string.isRequired
    }),
    id: PropTypes.any.isRequired
  }).isRequired,
  handleLikeClick: PropTypes.func.isRequired,
  handleDeleteClick: PropTypes.func.isRequired
}

export default Blog
