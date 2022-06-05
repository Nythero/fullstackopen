import blogService from '../services/blogs'

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

const handleClick = ({ blogsState, ...blogState }) => async (event) => {
  const blogData = blogDataFromStates(blogState)
  event.preventDefault()
  try {
    const blog = await postBlog(blogData)
    addBlog(blogsState, blog)
  }
  catch (err) {
    if(err.name === 'AxiosError') {
      const response = err.response
      console.log(response.status, response.data)
    }
    else {
      console.log(err)
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

const BlogForm = (props) => {
  const { titleState, authorState, urlState } = props
  return (
    <form>
      <InputField name='title' state={titleState}/>
      <InputField name='author' state={authorState}/>
      <InputField name='url' state={urlState}/>
      <button onClick={handleClick(props)}>create</button>
    </form>
  )
}

export default BlogForm
