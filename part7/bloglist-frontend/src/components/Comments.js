import InputField from './InputField'
import { useField } from '../hooks'
import { useDispatch } from 'react-redux'
import { commentBlog } from '../reducers/blogsReducer'

const commentLiMap = (comment) => {
  return (
    <li key={comment}>
      {comment}
    </li>
  )
}

const Comments = ({ blog }) => {
  const [comment, resetComment] = useField('text')
  const dispatch = useDispatch()
  const handleSubmit = async (event) => {
    event.preventDefault()
    dispatch(commentBlog(blog, comment.value))
    resetComment()
  }
  return (
    <>
      <h3>comments</h3>
      <form onSubmit={handleSubmit}>
        <InputField name='comment' input={comment} />
        <button>add comment</button>
      </form>
      <ul>
        {blog.comments.map(commentLiMap)}
      </ul>
    </>
  )
}

export default Comments
