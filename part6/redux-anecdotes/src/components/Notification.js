
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { removeNotification } from '../reducers/notificationReducer'

const Notification = (props) => {
  const notification = props.notification
  const removeNotification = props.removeNotification

  useEffect(() => {
    if (!notification) {
      return
    }

    const hideTimeout = window.setTimeout(() => {
      removeNotification()
    }, notification.hideAfterMs)

    return function clearHideTimeout() {
      window.clearTimeout(hideTimeout)
    }
  }, [notification, removeNotification])

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (!notification) {
    return null
  }

  return (
    <div style={style}>
      {notification.content}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const mapDispatchToProps = {
  removeNotification
}

const ConnectedNotification = connect(mapStateToProps, mapDispatchToProps)(Notification)
export default ConnectedNotification