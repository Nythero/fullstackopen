import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import populateBlog from '../utils/populateBlog'
import { setNotification } from '../reducers/notificationReducer'
import handleError from '../utils/handleError'
const initialState = []

const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    set(state, action) {
      return action.payload
    },
    add(state, action) {
      const blog = action.payload
      return state.concat(blog)
    },
    remove(state, action) {
      const id = action.payload
      return state.filter(blog => blog.id !== id)
    },
    reeplace(state, action) {
      const blog = action.payload
      const id = blog.id
      return state.map(b => (b.id === id)? blog : b)
    }
  }
})

export const { set, add, remove, reeplace } = blogsSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(set(blogs))
  }
}

export const addBlog = (blog) => {
  return async dispatch => {
    try {
      const newBlog = await blogService.post(blog)
      const populatedBlog = await populateBlog(newBlog)
      dispatch(add(populatedBlog))
      const notification = {
        type:'notificationSuccess',
        message:`added blog '${populatedBlog.title}'`
      }
      dispatch(setNotification(notification, 5))
    }
    catch(err) {
      handleError(err, 'Couldn\' add the blog. Try again later', dispatch)
    }
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    try {
      await blogService.remove(id)
      dispatch(remove(id))
      const notification = {
        type:'notificationSuccess',
        message: 'deleted blog successfully'
      }
      dispatch(setNotification(notification, 5))
    }
    catch(err) {
      handleError(err, 'Couldn\' remove the blog. Try again later', dispatch)
    }
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    try {
      const blogData = { ...blog, likes: blog.likes + 1 }
      const newBlog = await blogService.put(blogData)
      const populatedBlog = await populateBlog(newBlog)
      dispatch(reeplace(populatedBlog))
      const notification = {
        type:'notificationSuccess',
        message:`liked blog '${blogData.title}'`
      }
      dispatch(setNotification(notification, 5))
    }
    catch(err) {
      handleError(err, 'Couldn\'t add your like. Try again later', dispatch)
    }
  }
}

export default blogsSlice.reducer
