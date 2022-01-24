import anecdotesService from "../services/anecdotes"

const initialState = []

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ANECDOTE_VOTE':
      return state.map(anecdote => 
        anecdote.id === action.updatedAnecdote.id 
        ? action.updatedAnecdote
        : anecdote
      )
    case 'ANECDOTE_ADD':
      return state.concat(action.anecdote)
    case 'ANECDOTES_INIT':
      return action.anecdotes
    default:
      return state
  }
}

export const voteForAnecdote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdotesService.update({
      ...anecdote,
      votes: anecdote.votes + 1
    })
    
    dispatch({
      type: 'ANECDOTE_VOTE',
      updatedAnecdote
    })
  }
}

export const addAnecdote = (anecdoteContent) => {
  return async dispatch => {
    const createdAnecdote = await anecdotesService.create({
      content: anecdoteContent,
      votes: 0
    })
    
    dispatch({
      type: 'ANECDOTE_ADD',
      anecdote: createdAnecdote
    })
  }
}

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