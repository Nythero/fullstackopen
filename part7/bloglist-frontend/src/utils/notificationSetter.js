let timeoutId

const notificationSetter = (notificationState) => {
  const setNotification = notificationState[1]
  const f = (type, message) => {
    const notification = { type, message }
    setNotification(notification)

    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      setNotification(null)
    }, 5000)
  }
  return f
}

export default notificationSetter
