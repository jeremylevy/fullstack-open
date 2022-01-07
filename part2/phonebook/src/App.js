import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const personAlreadyExists = (personToCheck) => {
    for (let person of persons) {
      if (person.name === personToCheck.name) return true
    }

    return false
  }

  const handleNameInputChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePersonSubmit = (event) => {
    event.preventDefault()

    const newPerson = { name: newName }

    if (personAlreadyExists(newPerson)) {
      alert(`${newPerson.name} is already added to phonebook`)
      setNewName('')

      return
    }

    const updatedPersons = [
      ...persons,
      newPerson
    ]

    setPersons(updatedPersons)
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handlePersonSubmit}>
        <div>
          name: <input onChange={handleNameInputChange} value={newName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.name}>{person.name}</p>)}
    </div>
  )
}

export default App
