import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [filter, setFilter] = useState('')
  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

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

  const handleFilterInputChange = (event) => {
    setFilter(event.target.value)
  }

  const handleNameInputChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberInputChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handlePersonSubmit = (event) => {
    event.preventDefault()

    const newPerson = { id: persons.length + 1, name: newName, number: newNumber }

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
      
      <div>
        <p>
          filter shown with 
          <input onChange={handleFilterInputChange} value={filter} />
        </p>
      </div>
      
      <h2>add a new</h2>
      
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
      
      { filteredPersons.map(person => <p key={person.id}>{person.name} {person.number}</p>) }
    </div>
  )
}

export default App
