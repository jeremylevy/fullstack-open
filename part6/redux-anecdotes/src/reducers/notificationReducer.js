const initialState = null

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NOTIFICATION_ADD':
      return {
        content: action.content,
        hideAfterMs: action.hideAfterMs
      }
    case 'NOTIFICATION_REMOVE':
      return null
    default:
      return state
  }
}

export const addNotification = (content, hideAfterMs) => {
  return async dispatch => {
    dispatch({
      type: 'NOTIFICATION_ADD',
      content,
      hideAfterMs
    })
  }
}

export const removeNotification = () => (
  {
    type: 'NOTIFICATION_REMOVE'
  }
)

export default reducer