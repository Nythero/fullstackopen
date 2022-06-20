import { useField } from '../hooks'
import InputField from './InputField'

const BlogForm = ({ addBlog, blogFormRef }) => {
  const [title, resetTitle] = useField('text')
  const [author, resetAuthor] = useField('text')
  const [url, resetUrl] = useField('text')

  const handleSubmit = (event) => {
    event.preventDefault()
    const blogData = {
      title: title.value,
      author: author.value,
      url: url.value
    }
    addBlog(blogData)
    resetTitle()
    resetAuthor()
    resetUrl()
    blogFormRef.current.toggleVisibility()
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputField name='title' input={title}/>
      <InputField name='author' input={author}/>
      <InputField name='url' input={url}/>
      <button type='submit'>create</button>
    </form>
  )
}

export default BlogForm
