import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notify(state, action) {
      return action.payload
    },
    clear() {
      return initialState
    }
  }
})

export const { notify, clear } = notificationSlice.actions

let timeout

export const setNotification = (notification, time) => {
  return dispatch => {
    const timeInMs = time * 1000
    dispatch(notify(notification))
    clearTimeout(timeout)
    timeout = setTimeout(() => dispatch(clear()), timeInMs)
  }
}

export default notificationSlice.reducer
