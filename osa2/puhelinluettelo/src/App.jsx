import { useState } from 'react'
import Person from './components/Person'


const App = (props) => {
  const [persons, setPersons] = useState([
    {name: 'Arto Hellas' , id:1,number: '040-1231244'}
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)

  const addPerson = (event) => {
    event.preventDefault()
    const nameExists = persons.some(
      person => person.name === newName
    )
  
    if (nameExists) {
      alert(`${newPerson} is already added to phonebook`)
      return
    }

    const personObject = {
      name: newName,
      id: String(persons.length + 1),
      number: newNumber,
    }
    console.log("toimii", personObject)
    setPersons(persons.concat(personObject))
    setNewPerson('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.important === true)

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
      <div>
        name:
        <input
          value={newName}
          onChange={handleNameChange}
        />
      </div>
      <div>
        number:
        <input
          value={newNumber}
          onChange={handleNumberChange}
        />
      </div>
      <button type="submit">add</button>
    </form>

      <h2>Numbers</h2>
      <ul>
      {personsToShow.map(person =>
          <Person key={person.id} person={person} />
        )}
      </ul>
    </div>
  )
}

export default App
