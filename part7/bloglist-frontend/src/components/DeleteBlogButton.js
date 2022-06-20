const DeleteBlogButton = ({ blog, user, handleDeleteClick }) => {
  if(user === null)
    return null
  const blogCreatorUsername = blog.user.username
  const userUsername = user.username
  if(blogCreatorUsername === userUsername)
    return <button onClick={handleDeleteClick} >remove</button>
  return null
}

export default DeleteBlogButton
