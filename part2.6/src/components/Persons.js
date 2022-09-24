const Persons = ({persons, deletehenkilo}) => {

  const deletePersons = id => {
    if (window.confirm(`delete ${persons.name} ?`)){
      console.log(persons)

      const personid = persons.id
      const personsnimi = persons.name
      deletehenkilo(personid,personsnimi)
      
     
    }
  }
  
  
  
  

  return (
    <div>
    <p>{persons.name}  {persons.number} <button onClick= {deletePersons}>delete</button></p>
    </div>
    
  )
}
export default Persons;
