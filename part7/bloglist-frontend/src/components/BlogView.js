import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import DeleteBlogButton from './DeleteBlogButton'
import Comments from './Comments'
import { Navigate } from 'react-router-dom'

const BlogView = ({ handleLikeClick, handleDeleteClick }) => {
  const id = useParams().id
  const blogs = useSelector(state => state.blogs)
  const blog = blogs.find(b => b.id === id)
  if(blog) {
    return (
      <div>
        <h2>{blog.title} - {blog.author}</h2>
        <a href={blog.url}>{blog.url}</a>
        <br />
        likes {blog.likes}
        <button onClick={handleLikeClick}>like</button>
        <br />
        added by {blog.user.name}
        <br />
        <DeleteBlogButton
          blog={blog}
          handleDeleteClick={handleDeleteClick} />
        <Comments blog={blog} />
      </div>
    )
  }
  else {
    return <Navigate replace to='/' />
  }
}

export default BlogView
