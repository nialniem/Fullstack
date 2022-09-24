import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import Notification from './components/Notification'



const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const baseUrl = 'http://localhost:3001/persons'
  const [errorMessage, setErrorMessage] = useState('ei vielä tehtyä')
  



  
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleFilter = (event) => {
    console.log(event.target.value)
    setSearchValue(event.target.value);

    const bigCities = []
  
  for (let i = 0; i < persons.length; i++) {
    if(persons[i] === searchValue){
      persons[i].important = false;
    }
  }

  for (let i = 0; i < persons.length; i++) {
    if (persons[i].important === true) {
        bigCities.push(persons[i]);
    }
}
console.log(bigCities);
    
      
        
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const deletehenkilo = (personid,personsnimi) => {
    setPersons(persons.filter(n => n.id !== personid))
    
    setErrorMessage(
      `Deleted ${personsnimi}`
    )
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)

    const request = axios.delete(`${baseUrl}/${personid}`)
    return request.then(response => response.data)
  }
  
  
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <form>
       <div>
       <Filter searchValue={searchValue}
          setSearchValue = {setSearchValue}
          persons = {persons}
          handleFilter = {handleFilter}
          newName = {newName}
          newNumber = {newNumber} />
      </div>
      </form>
      <h3>add a new</h3>
      <PersonForm  newName={newName}
        setNewNumber={setNewNumber}
        setNewName={setNewName}
        newNumber= {newNumber}
        setPersons = {setPersons}
        handleNoteChange = {handleNoteChange}
        handleNumberChange = {handleNumberChange}
        persons = {persons}
        setErrorMessage={setErrorMessage}
        deletehenkilo = {deletehenkilo}/>
      <h3>Numbers</h3>
      <ul>
        {persons.map(persons => 
          <Persons key={persons.id} persons={persons} deletehenkilo = {deletehenkilo} />
        )}
      </ul>
    </div>
  )

}

export default App