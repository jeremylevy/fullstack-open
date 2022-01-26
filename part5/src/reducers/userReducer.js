const initialState = null

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'USER_SET':
    return action.user
  default:
    return state
  }
}

export const setUser = (user) => {
  return {
    type: 'USER_SET',
    user
  }
}

export default reducer