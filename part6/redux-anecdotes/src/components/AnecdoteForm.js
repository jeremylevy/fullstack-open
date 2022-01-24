import React from 'react'
import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const { addAnecdote, addNotification } = props

  const handleCreateFormSubmit = async (submitEvent) => {
    submitEvent.preventDefault()

    const anecdote = submitEvent.target.anecdote.value

    addAnecdote(anecdote)
    addNotification(`you added '${anecdote}'`, 5000)

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

const mapDispatchToProps = {
  addAnecdote,
  addNotification
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm