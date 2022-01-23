const initialState = ''

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FILTER_SET':
      return action.filter
    default:
      return state
  }
}

export const setFilter = (filter) => (
  {
    type: 'FILTER_SET',
    filter
  }
)

export default reducer