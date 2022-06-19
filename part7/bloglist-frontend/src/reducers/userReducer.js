import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotification } from '../reducers/notificationReducer'
import handleError from '../utils/handleError'

const initialState = null

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action) {
      const user = action.payload
      return user
    },
    logout() {
      return initialState
    }
  }
})

export const { login, logout } = userSlice.actions

export const getUser = () => {
  return async dispatch => {
    const loggedUser = window.localStorage.getItem('loggedBlogUser')
    if(loggedUser) {
      const u = JSON.parse(loggedUser)
      blogService.setToken(u.token)
      dispatch(login(u))
    }
  }
}

export const loginUser = (username, password) => {
  return async dispatch => {
    try {
      const u = await loginService.login(username, password)
      blogService.setToken(u.token)
      dispatch(login(u))
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(u))
      const notification = {
        type: 'success',
        message: `logged in as ${username}`
      }
      dispatch(setNotification(notification, 5))
    }
    catch(err) {
      handleError(err, 'couldn\'t login. Try again later', dispatch)
    }
  }
}

export const logoutUser = () => {
  return dispatch => {
    dispatch(logout())
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogUser')
    const notification = {
      type: 'success',
      message: 'logged out successfully'
    }
    dispatch(setNotification(notification, 5))
  }
}

export default userSlice.reducer
