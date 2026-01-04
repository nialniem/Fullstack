import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'


const App = (props) => {
  const [persons, setPersons] = useState([
    {name: 'Arto Hellas' , id:1,number: '040-1231244'},
    { name: 'Ada Lovelace',id:2, number: '39-44-5323523' },
    { name: 'Dan Abramov',id:3, number: '12-43-234345' },
    { name: 'Mary Poppendieck',id:4, number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'notes')

  const addPerson = (event) => {
    event.preventDefault()
    const nameExists = persons.some(
      person => person.name === newName
    )
  
    if (nameExists) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const personObject = {
      name: newName,
      id: String(persons.length + 1),
      number: newNumber,
    }
    console.log("toimii", personObject)
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')

  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  
  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )
  
  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons persons={personsToShow} />
    </div>
  )
}


export default App
