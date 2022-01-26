import userService from '../services/users'

const initialState = []

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'USERS_LOAD':
    return action.users
  default:
    return state
  }
}

export const loadUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()

    dispatch({
      type: 'USERS_LOAD',
      users
    })
  }
}

export default reducer