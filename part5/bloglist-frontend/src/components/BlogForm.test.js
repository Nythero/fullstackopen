import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

let addBlog
let blogFormRef

beforeEach(() => {
  addBlog = jest.fn()
  blogFormRef = { current: { toggleVisibility: jest.fn() } }

  render(<BlogForm
    addBlog={addBlog}
    blogFormRef={blogFormRef}/>)
})

test('handler is called with correct parameters when a new note is created', async () => {
  const createButton = screen.getByText('create')
  const user = userEvent.setup()

  const titleInput = screen.getByLabelText('title')
  const authorInput = screen.getByLabelText('author')
  const urlInput = screen.getByLabelText('url')

  await user.type(titleInput, 'title')
  await user.type(authorInput, 'author')
  await user.type(urlInput, 'url')
  await user.click(createButton)

  expect(addBlog.mock.calls).toHaveLength(1)

  const addBlogParameters = addBlog.mock.calls[0]
  const dataBlog = { title: 'title', author: 'author', url: 'url' }
  expect(addBlogParameters[0]).toEqual(dataBlog)
})
