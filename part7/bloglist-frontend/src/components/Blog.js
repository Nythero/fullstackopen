import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  return (
    <div className='blog'>
      <Link className='link-light'to={`/blogs/${blog.id}`}>
        {blog.title} - {blog.author}
      </Link>
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
  }).isRequired
}

export default Blog
