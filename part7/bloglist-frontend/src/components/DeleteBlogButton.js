import { useSelector } from 'react-redux'

const DeleteBlogButton = ({ blog, handleDeleteClick }) => {
  const user = useSelector(state => state.user)
  if(user === null)
    return null
  const blogCreatorUsername = blog.user.username
  const userUsername = user.username
  if(blogCreatorUsername === userUsername)
    return <button onClick={handleDeleteClick(blog)} >remove</button>
  return null
}

export default DeleteBlogButton
