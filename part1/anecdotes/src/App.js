import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const randomNumberFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({})

  const anecdote = anecdotes[selected]
  const anecdoteVotes = votes[selected] || 0

  const changeAnecdote = () => setSelected(randomNumberFromInterval(0, anecdotes.length - 1))
  const vote = () => setVotes({
    ...votes,
    [selected]: anecdoteVotes + 1
  })

  return (
    <div>
      <p>{anecdote}</p>

      <p>has {anecdoteVotes} vote(s)</p>

      <p>
        <button onClick={vote}>vote</button>
        <button onClick={changeAnecdote}>next anecdote</button>
      </p>
    </div>
  )
}

export default App
