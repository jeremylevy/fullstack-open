import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const filter = useSelector(state => state.filter)
  const anecdotes = useSelector(state => {
    const filteredAnecdotes = state.anecdotes.filter(anecdote => anecdote.content.includes(filter))
    const sortedFilteredAnecdotes = [...filteredAnecdotes].sort((anecdoteA, anecdoteB) => anecdoteB.votes - anecdoteA.votes)

    return sortedFilteredAnecdotes
  })
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(voteForAnecdote(anecdote))
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