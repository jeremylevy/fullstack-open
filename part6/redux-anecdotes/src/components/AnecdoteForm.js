import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'
import anecdotesService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleCreateFormSubmit = async (submitEvent) => {
    submitEvent.preventDefault()

    const anecdote = submitEvent.target.anecdote.value
    const createdAnecdote = await anecdotesService.create({
      content: anecdote,
      votes: 0
    })
    dispatch(addAnecdote(createdAnecdote))
    dispatch(addNotification(`you added '${createdAnecdote.content}'`))

    // clean input
    submitEvent.target.anecdote.value = ''
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleCreateFormSubmit}>
        <div><input name="anecdote" /></div>
        <button>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm