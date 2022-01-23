import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const add = (submitEvent) => {
    submitEvent.preventDefault()

    const anecdote = submitEvent.target.anecdote.value
    dispatch(addAnecdote(anecdote))

    // clean input
    submitEvent.target.anecdote.value = ''
  }

  return (
    <form onSubmit={add}>
      <div><input name="anecdote" /></div>
      <button>create</button>
    </form>
  )
}

export default AnecdoteForm