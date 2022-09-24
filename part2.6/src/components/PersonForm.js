
import personService from '../services/persons'


const PersonForm = (props) => {

    const {
        newName,
        setNewName,
        newNumber,
        persons,
        setPersons,
        handleNoteChange,
        handleNumberChange,
        setNewNumber,
        setErrorMessage, 
        
        
      } = props;
    
    
    const addPersons = (event) => {
       
        event.preventDefault()
        const personObject = {
          name: newName,
          number: newNumber,
          id: persons.length+1
          
        }
        function isPerson(person) {
          return person.name === newName;
        }
        const onko = (persons.find(isPerson));
        if(onko !== undefined){
          if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
            personService
            .create(personObject)
            .then(returnedPerson=> {
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
            
      })}
          else{
            setNewName('')
            setNewNumber('')
          }
        }
        else{
        personService
        .create(personObject)
        .then(returnedPerson=> {
        setPersons(persons.concat(returnedPerson))
        setErrorMessage(
          `Added ${returnedPerson.name}`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNewName('')
        setNewNumber('')})}        
    }
        

    

    return (<form onSubmit={addPersons}>
        <div>
          name: <input value={newName} onChange={handleNoteChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    );
  };
  
  export default  PersonForm