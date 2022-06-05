const NotificationMessage = ({ notificationState }) => {
  const [notificationMessage] = notificationState
  if(notificationMessage === null)
    return null
  return(
    <div className={notificationMessage.type}>
      {notificationMessage.message}
    </div>
  )
}

export default NotificationMessage
