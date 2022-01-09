import React, { useState, useEffect } from 'react'
import personsService from './services/persons'

const Filter = ({ onChange, value }) => (
  <div>
    <p>
      filter shown with 
      <input onChange={onChange} value={value} />
    </p>
  </div>
)

const PersonForm = ({ handlePersonSubmit, handleNameInputChange, handleNumberInputChange, newName, newNumber }) => (
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
)

const Persons = ({ persons, handlePersonDelete }) => (
  persons.map(person => (
    <div key={person.id}>
      {person.name} {person.number}
      &nbsp;
      <button onClick={() => handlePersonDelete(person.id)}>delete</button>
    </div>
  ))
)

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [filter, setFilter] = useState('')
  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  useEffect(() => {
    personsService
      .getAll()
      .then(persons => setPersons(persons))
  }, [])

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

    const newPerson = { name: newName, number: newNumber }

    if (personAlreadyExists(newPerson)) {
      alert(`${newPerson.name} is already added to phonebook`)
      resetInputFields()

      return
    }

    personsService
      .create(newPerson)
      .then(createdPerson => {
        setPersons(persons.concat([createdPerson]))
        resetInputFields()
      })
  }

  const handlePersonDelete = (personToDeleteId) => {
    const personToDelete = persons.find(person => person.id === personToDeleteId)
    const deletionConfirmed = window.confirm(`Delete ${personToDelete.name} ?`)

    if (!deletionConfirmed) {
      return
    }

    personsService
      .remove(personToDelete.id)
      .then(() => setPersons(persons.filter(person => person !== personToDelete)))
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter onChange={handleFilterInputChange} value={filter} />
      
      <h2>add a new</h2>

      <PersonForm 
        handlePersonSubmit={handlePersonSubmit} 
        handleNameInputChange={handleNameInputChange} 
        handleNumberInputChange={handleNumberInputChange}
        newName={newName}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>
      
      <Persons persons={filteredPersons} handlePersonDelete={handlePersonDelete} />
    </div>
  )
}

export default App
