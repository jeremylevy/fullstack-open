import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import { voteForAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => [...state].sort(
    (anecdoteA, anecdoteB) => anecdoteB.votes - anecdoteA.votes)
  )
  const dispatch = useDispatch()

  const vote = (anecdoteId) => {
    dispatch(voteForAnecdote(anecdoteId))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  )
}

export default App