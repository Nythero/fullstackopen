import BlogForm from './BlogForm'
import BlogList from './BlogList'

const Blogs = ({ blogsState, user, titleState, authorState, urlState }) => {
  const [blogs] = blogsState
  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      <BlogForm 
        titleState={titleState}
        authorState={authorState}
        urlState={urlState}
        blogsState={blogsState}/>
      <BlogList blogs={blogs} />
    </div>
  )
}

export default Blogs
