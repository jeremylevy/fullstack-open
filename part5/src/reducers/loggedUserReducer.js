const initialState = null

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'LOGGED_USER_SET':
    return action.user
  default:
    return state
  }
}

export const setLoggedUser = (user) => {
  return {
    type: 'LOGGED_USER_SET',
    user
  }
}

export default reducer