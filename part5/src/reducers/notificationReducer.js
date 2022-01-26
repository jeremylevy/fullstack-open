const initialState = null

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'NOTIFICATION_ADD':
    return {
      kind: action.kind,
      message: action.message,
      hideAfterMs: action.hideAfterMs
    }
  case 'NOTIFICATION_REMOVE':
    return null
  default:
    return state
  }
}

export const addNotification = (kind, message, hideAfterMs) => {
  return {
    type: 'NOTIFICATION_ADD',
    kind,
    message,
    hideAfterMs
  }
}

export const removeNotification = () => {
  return {
    type: 'NOTIFICATION_REMOVE'
  }
}

export default reducer