import { useEffect, useState } from 'react'
import personsService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import './index.css'


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
  const [notification, setNotification] = useState(null)




  useEffect(() => {
    personsService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])
  
  

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personsService
        .remove(id)
        .then(() => {
          setPersons(prev => prev.filter(p => p.id !== id))
  
          setNotification({
            text: `Deleted ${name}`,
            type: 'success'
          })
          setTimeout(() => setNotification(null), 5000)
          
        })
        .catch(error => {
          setNotification({
            text: `Information of ${name} was already removed from server`,
            type: 'error'
          })
          setTimeout(() => setNotification(null), 5000)
          
        })
    }
  }
  
  
  const addPerson = (event) => {
    event.preventDefault()
  
    const existingPerson = persons.find(p => p.name === newName)
  
    if (existingPerson) {
      const ok = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )
  
      if (ok) {
        const updatedPerson = { ...existingPerson, number: newNumber }
  
        personsService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p =>
              p.id !== existingPerson.id ? p : returnedPerson
            ))
  
            setNotification({
              text: `Added ${returnedPerson.name}`,
              type: 'success'
            })
            setTimeout(() => setNotification(null), 5000)
            
  
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setNotification({
              text: `Added ${returnedPerson.name}`,
              type: 'success'
            })
            setTimeout(() => setNotification(null), 5000)
            
            
            setPersons(prev => prev.filter(p => p.id !== existingPerson.id))
          })
          
      }
  
      return
    }
  
    const personObject = {
      name: newName,
      number: newNumber
    }
  
    personsService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
  
        setNotification({
          text: `Added ${returnedPerson.name}`,
          type: 'success'
        })
        setTimeout(() => setNotification(null), 5000)
        
  
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        setNotification({
          text: 'your message here',
          type: 'success'
        })
        
        setTimeout(() => setMessage(null), 5000)
        console.log(error)
      })
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
      <Notification notification={notification} />


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
      <Persons
       persons={personsToShow}
       deletePerson={deletePerson}
        />
      
    </div>
  )
}


export default App
