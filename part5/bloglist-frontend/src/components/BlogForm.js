import blogService from '../services/blogs'
import notificationSetter from '../utils/notificationSetter'
import populateBlog from '../utils/populateBlog'

const handleChange = (setter) => (event) => setter(event.target.value)

const postBlog = async (blogData) => {
  const response = await blogService.post(blogData)
  return response.data
}

const addBlog = (blogsState, blog) => { 
  const [blogs, setBlogs] = blogsState
  setBlogs(blogs.concat(blog))
}

const blogDataFromStates = ({ titleState, authorState, urlState }) => {
  const [title] = titleState
  const [author] = authorState
  const [url] = urlState
  return { title, author, url }
}

const setState = (state, newValue) => {
  const setValue = state[1]
  setValue(newValue)
}

const resetBlogState = ({ titleState, authorState, urlState }) => {
  setState(titleState, '')
  setState(authorState, '')
  setState(urlState, '')
}

const handleClick = ({ blogsState, notificationState, ...blogState }, blogFormRef) => async (event) => {
  const blogData = blogDataFromStates(blogState)
  event.preventDefault()
  const setNotification = notificationSetter(notificationState)
  try {
    const blogResponse = await postBlog(blogData)
    const blog = await populateBlog(blogResponse)
    addBlog(blogsState, blog)
    setNotification('notificationSuccess', `added blog '${blog.title}'`)
    blogFormRef.current.toggleVisibility()
  }
  catch (err) {
    if(err.name === 'AxiosError') {
      const response = err.response
      console.log(response.status, response.data)
      setNotification('notificationError', response.data.error)
    }
    else {
      console.log(err)
      setNotification('notificationError', `couldn't add the blog, try again later`)
    }
  }
  resetBlogState(blogState)
}

const InputField = ({ name, state }) => {
  const [value, setValue] = state
  return (
    <>
      <label>{name}: </label>
      <input value={value} onChange={handleChange(setValue)}></input>
      <br />
    </>
  )
}

const BlogForm = ({ states, blogFormRef }) => {
  const { titleState, authorState, urlState } = states
  return (
    <form>
      <InputField name='title' state={titleState}/>
      <InputField name='author' state={authorState}/>
      <InputField name='url' state={urlState}/>
      <button onClick={handleClick(states, blogFormRef)}>create</button>
    </form>
  )
}

export default BlogForm
