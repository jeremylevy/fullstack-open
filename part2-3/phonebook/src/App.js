import React, { useState, useEffect } from 'react'
import personsService from './services/persons'

const Notification = ({ type, message }) => (
  <div className={'notification ' + type}>
    {message}
  </div>
)

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
      <button onClick={() => handlePersonDelete(person)}>delete</button>
    </div>
  ))
)

const App = () => {
  const [notification, setNotification] = useState(null)
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

  const findPersonWithName = (name) => persons.find(person => person.name === name)

  const displayNotification = (type, message, timeout = 5000) => {
    setNotification({
      type,
      message
    })

    setTimeout(() => setNotification(null), timeout)
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
    const personWithThisName = findPersonWithName(newPerson.name)

    if (personWithThisName) {
      const updateConfirmed = window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)

      if (!updateConfirmed) {
        resetInputFields()
        return
      }

      personsService
        .update({
          ...personWithThisName,
          number: newNumber
        })
        .then(updatedPerson => {
          setPersons(persons.map(person => person !== personWithThisName ? person : updatedPerson))
          
          displayNotification('success', `Updated ${updatedPerson.name}`)
          resetInputFields()
        })
        .catch(() => {
          setPersons(persons.filter(person => person !== personWithThisName))

          displayNotification('error', `Information of ${personWithThisName.name} has already been removed from server`)
          resetInputFields()
        })

      return
    }

    personsService
      .create(newPerson)
      .then(createdPerson => {
        setPersons(persons.concat([createdPerson]))

        displayNotification('success', `Added ${createdPerson.name}`)
        resetInputFields()
      })
  }

  const handlePersonDelete = (personToDelete) => {
    const deletionConfirmed = window.confirm(`Delete ${personToDelete.name} ?`)

    if (!deletionConfirmed) {
      return
    }

    personsService
      .remove(personToDelete)
      .then(() => setPersons(persons.filter(person => person !== personToDelete)))
  }

  return (
    <div>
      <h2>Phonebook</h2>

      { notification ? <Notification type={notification.type} message={notification.message} /> : null }

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
