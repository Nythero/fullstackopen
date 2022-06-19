import { useSelector } from 'react-redux'

const DeleteBlogButton = ({ blog, handleDeleteClick }) => {
  const user = useSelector(state => state.user)
  if(user === null)
    return null
  const blogCreatorUsername = blog.user.username
  const userUsername = user.username
  if(blogCreatorUsername === userUsername)
    return <button
      className='btn btn-dark btn-outline-light py-0 mx-3'
      onClick={handleDeleteClick(blog)} >remove</button>
  return null
}

export default DeleteBlogButton
