const reducer = (state = null, action) => {
  switch (action.type) {
    case 'NOTIFICATION_ADD':
      return action.notification
    case 'NOTIFICATION_REMOVE':
      return null
    default:
      return state
  }
}

export const addNotification = (notification) => (
  {
    type: 'NOTIFICATION_ADD',
    notification
  }
)

export const removeNotification = () => (
  {
    type: 'NOTIFICATION_REMOVE'
  }
)

export default reducer