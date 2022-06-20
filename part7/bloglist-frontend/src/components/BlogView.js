import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import DeleteBlogButton from './DeleteBlogButton'

const commentLiMap = (comment) => {
  return (
    <li key={comment}>
      {comment}
    </li>
  )
}

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
        <h3>comments</h3>
        <ul>
          {blog.comments.map(commentLiMap)}
        </ul>
      </div>
    )
  }
  else {
    return <div>Not Found</div>
  }
}

export default BlogView
