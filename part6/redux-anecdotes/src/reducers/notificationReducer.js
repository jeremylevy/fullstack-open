const initialState = 'Initial notification'

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NOTIFICATION_CHANGE':
      return action.notification
    default:
      return state
  }
}

export default reducer