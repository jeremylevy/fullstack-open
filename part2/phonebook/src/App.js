import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const personAlreadyExists = (personToCheck) => {
    for (let person of persons) {
      if (person.name === personToCheck.name) return true
    }

    return false
  }

  const resetInputFields = () => {
    setNewName('')
    setNewNumber('')
  }

  const handleNameInputChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberInputChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handlePersonSubmit = (event) => {
    event.preventDefault()

    const newPerson = { name: newName, number: newNumber }

    if (personAlreadyExists(newPerson)) {
      alert(`${newPerson.name} is already added to phonebook`)
      resetInputFields()

      return
    }

    const updatedPersons = [
      ...persons,
      newPerson
    ]

    setPersons(updatedPersons)

    resetInputFields()
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handlePersonSubmit}>
        <div>
          name: <input onChange={handleNameInputChange} value={newName} />
        </div>
        <div>
          number: <input onChange={handleNumberInputChange} value={newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App
