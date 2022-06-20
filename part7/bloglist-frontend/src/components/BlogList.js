import Blog from './Blog'
import { useSelector, useDispatch } from 'react-redux'
import { removeBlog, likeBlog } from '../reducers/blogsReducer'

const sortingBlogsFunction = (b1, b2) => {
  if(b1.likes > b2.likes)
    return -1
  else if (b2.likes > b1.likes)
    return 1
  else
    return 0
}

const BlogList = ({ user }) => {
  const dispatch = useDispatch()

  const handleDeleteClick = (blog) => async () => {
    const id = blog.id
    if(!window.confirm(`Remove blog ${blog.title} by ${blog.author}`))
      return
    dispatch(removeBlog(id))
  }
  const handleLikeClick = (blog) => async () => {
    dispatch(likeBlog(blog))
  }

  const blogs = useSelector(state => state.blogs)
  const blogComponent = blog => <Blog
    blog={blog}
    key={blog.id}
    handleLikeClick={handleLikeClick(blog)}
    handleDeleteClick={handleDeleteClick(blog)}
    user={user}/>

  const sortedBlogs = [...blogs].sort(sortingBlogsFunction)
  return sortedBlogs.map(blogComponent)
}

export default BlogList
