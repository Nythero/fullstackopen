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
      <div className='px-3'>
        <div className='d-flex'>
          <h2 className='text-light'>{blog.title} - {blog.author}</h2>
          <DeleteBlogButton
            blog={blog}
            handleDeleteClick={handleDeleteClick} />
        </div>
        <a className='link link-light' href={blog.url}>{blog.url}</a>
        <p className='text-light'>likes {blog.likes}</p>
        <button className='btn btn-dark btn-outline-light' onClick={handleLikeClick(blog)}>like</button>
        <p className='text-light my-3'>added by {blog.user.name}</p>
        <Comments blog={blog} />
      </div>
    )
  }
  else {
    return <Navigate replace to='/' />
  }
}

export default BlogView
