import anecdotesService from "../services/anecdotes"

const initialState = []

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ANECDOTE_VOTE':
      const anecdoteToUpdate = state.find(anecdote => anecdote.id === action.anecdoteId)
      const updatedAnecdote = {
        ...anecdoteToUpdate,
        votes: anecdoteToUpdate.votes + 1
      }

      const updatedState = state.map(anecdote => 
        anecdote.id === action.anecdoteId 
        ? updatedAnecdote 
        : anecdote
      )

      return updatedState
    case 'ANECDOTE_ADD':
      return state.concat(action.anecdote)
    case 'ANECDOTES_INIT':
      return action.anecdotes
    default:
      return state
  }
}

export const voteForAnecdote = (anecdoteId) => (
  {
    type: 'ANECDOTE_VOTE',
    anecdoteId
  }
)

export const addAnecdote = (anecdote) => (
  {
    type: 'ANECDOTE_ADD',
    anecdote
  }
)

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    
    dispatch({
      type: 'ANECDOTES_INIT',
      anecdotes
    })
  }
}

export default reducer