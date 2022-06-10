import { useState } from 'react'

const handleChange = (setter) => (event) => setter(event.target.value)

const InputField = ({ name, state }) => {
  const [value, setValue] = state
  return (
    <>
      <label htmlFor={`${name}-input`}>{name}</label>
      <input id={`${name}-input`} value={value} onChange={handleChange(setValue)}></input>
      <br />
    </>
  )
}

const blogDataFromStates = (titleState, authorState, urlState) => {
  const [title] = titleState
  const [author] = authorState
  const [url] = urlState
  return { title, author, url }
}

const setState = (state, newValue) => {
  const setValue = state[1]
  setValue(newValue)
}

const resetBlogState = (titleState, authorState, urlState) => {
  setState(titleState, '')
  setState(authorState, '')
  setState(urlState, '')
}

const BlogForm = ({ addBlog, blogFormRef }) => {
  const titleState = useState('')
  const authorState = useState('')
  const urlState = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const blogData = blogDataFromStates(titleState, authorState, urlState)
    addBlog(blogData)
    resetBlogState(titleState, authorState, urlState)
    blogFormRef.current.toggleVisibility()
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputField name='title' state={titleState}/>
      <InputField name='author' state={authorState}/>
      <InputField name='url' state={urlState}/>
      <button type='submit'>create</button>
    </form>
  )
}

export default BlogForm
