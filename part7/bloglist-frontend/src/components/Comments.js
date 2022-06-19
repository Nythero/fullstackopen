import InputField from './InputField'
import { useField } from '../hooks'
import { useDispatch } from 'react-redux'
import { commentBlog } from '../reducers/blogsReducer'

const commentLiMap = (comment) => {
  return (
    <li className='text-light list-group-item bg-secondary' key={comment}>
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
      <h3 className='text-light'>comments</h3>
      <form onSubmit={handleSubmit}>
        <InputField className='form-control' name='comment' input={comment} />
        <button className='btn btn-dark btn-outline-light my-3'>add comment</button>
      </form>
      <ul className='list-group'>
        {blog.comments.map(commentLiMap)}
      </ul>
    </>
  )
}

export default Comments
