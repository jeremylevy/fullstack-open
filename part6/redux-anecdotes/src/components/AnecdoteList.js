import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => [...state.anecdotes].sort(
    (anecdoteA, anecdoteB) => anecdoteB.votes - anecdoteA.votes)
  )
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(voteForAnecdote(anecdote.id))
    dispatch(addNotification(`you voted '${anecdote.content}'`))
  }

  return anecdotes.map(anecdote =>
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote)}>vote</button>
      </div>
    </div>
  )
}

export default AnecdoteList