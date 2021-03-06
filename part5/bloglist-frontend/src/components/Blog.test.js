import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

let handleLikeClick = jest.fn()
let handleDeleteClick = jest.fn()

beforeEach(() => {
  const blogUser = {
    id: 0,
    username: 'username',
    name: 'name',
    blogs: []
  }
  const blog = {
    title: 'title',
    author: 'author',
    url: 'url',
    likes: 0,
    id: 0,
    user: blogUser
  }
  const blogsState = []
  const user = {
    token: 'token',
    username: 'username',
    name: 'name'
  }

  render(<Blog
    blog={blog}
    blogsState={blogsState}
    user={user}
    handleLikeClick={handleLikeClick}
    handleDeleteClick={handleDeleteClick}/>)
})

test('renders title and author but not the details', () => {
  const regexp = /^.*title - author.*$/
  const div = screen.getByText(regexp)
  const button = screen.getByRole('button')

  expect(div).toBeDefined()
  expect(div).toHaveTextContent('title - author')
  expect(div).not.toHaveTextContent(/^.*url.*likes.*name.*$/)
  expect(button).toBeDefined()
})

test('renders title and author and the details', async () => {
  const regexp = /^.*title - author.*$/
  const div = screen.getByText(regexp)
  const button = screen.getByRole('button')
  const user = userEvent.setup()

  await user.click(button)

  expect(div).toHaveTextContent(/^.*url.*likes 0.*name.*$/)
})

test('like button works', async () => {
  const showButton = screen.getByRole('button')
  const user = userEvent.setup()

  await user.click(showButton)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(handleLikeClick.mock.calls).toHaveLength(2)
})
