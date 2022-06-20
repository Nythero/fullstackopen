import { useSelector } from 'react-redux'

const NotificationMessage = () => {
  const notification = useSelector(state => state.notification)
  if(notification === null)
    return null
  return(
    <div className={notification.type}>
      {notification.message}
    </div>
  )
}

export default NotificationMessage
