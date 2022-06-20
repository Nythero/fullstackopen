import { setNotification } from '../reducers/notificationReducer'

const handleError = (err, alternativeMessage, dispatch) => {
  if(err.name === 'AxiosError') {
    const response = err.response
    console.log(response.status, response.data)
    const notification = {
      type: 'notificationError',
      message: response.data.error
    }
    dispatch(setNotification(notification, 5))
  }
  else {
    console.log(err)
    const notification = {
      type: 'notificationError',
      message: alternativeMessage
    }
    dispatch(setNotification(notification, 5))
  }
}

export default handleError
