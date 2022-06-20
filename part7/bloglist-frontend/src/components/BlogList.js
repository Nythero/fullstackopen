import Blog from './Blog'
import { useSelector/*, useDispatch*/ } from 'react-redux'

const sortingBlogsFunction = (b1, b2) => {
  if(b1.likes > b2.likes)
    return -1
  else if (b2.likes > b1.likes)
    return 1
  else
    return 0
}

const BlogList = () => {
  //const dispatch = useDispatch()
  /**/

  const blogs = useSelector(state => state.blogs)
  const blogComponent = blog => <Blog
    blog={blog}
    key={blog.id}/>

  const sortedBlogs = [...blogs].sort(sortingBlogsFunction)
  return sortedBlogs.map(blogComponent)
}

export default BlogList
