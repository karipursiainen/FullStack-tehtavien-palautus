import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'

const Yheystiedot = ({persons}) => {
  const deleteName = (event) => {
    return(window.alert("Delete " + persons.name + " ? EI VIELÄ TOTEUTETTU!"))
  }

  return (
    <div>
      <form onSubmit={deleteName}>
        {persons.name} {persons.number}
        <button type="submit">delete</button>
      </form>
    </div>
  )
}

const NewName = (props) => {

  return (
    <div>
      name: <input value={props.newname} 
      onChange={props.onchange} />
    </div>
  )
}
const NewNumber = (props) => {

  return (
    <div>
      number: <input value={props.newnumber} 
      onChange={props.onchange} />
    </div>
  )
}

const App = () => {
  // tyhjä taulukko
  const [persons, setPersons] = useState([]) 
  const [newPerson, setNewPerson] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showFilter, setShowFilter ] = useState('')
  const [addedMessage, setAddedMessage] = useState('')
  
  const [ delName, setDelName ] = useState('')
  const [ delNumber, setDelNumber ] = useState('')
  
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  
  const addName = (event) => {

    const apupersons = persons.filter(n => n.name === newName)
    // Nimi on jo
    if (apupersons.length > 0) {
      window.alert(newName + " is allready added to phonebook")
    }
    // Nimeä ei ole
    else {
      event.preventDefault()
      const personObject = {
          name: newName,
          number: newNumber,
      } // nameObject
      personService
      .create(personObject)
        .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewPerson('')
        setNewName('')
        setNewNumber('')
        setAddedMessage('Added ' + returnedPerson.name)
      })
    } // else
  } // addName
 
  const handleNewFilter = (event) => {
    setShowFilter(event.target.value)
  } // setShowFilter

  const handleNewChange = (event) => {
    setNewName(event.target.value)
  } // handleNewChange

  const handleNewNumberChange = (event) => {
    setNewNumber(event.target.value)
  } // handleNewChange

  // muutetaan henkilön nimi että haku (input) pieniksi kirjaimiksi ( .toLowerCase() )
  const personsToShow = persons.filter(persons => 
    (persons.name.toLowerCase()).includes(showFilter.toLowerCase()) === true)
  

  return (
    <div>
      <Notification message={addedMessage} />
      <h2>Phonebook</h2>
      
      <div>
        <p>filter shown with name<input value={showFilter} 
        onChange={handleNewFilter}/> </p>
      </div>
      
        <h2>add a new</h2>
        <form onSubmit={addName}>
          <div>
            <NewName newname={newName} onchange={handleNewChange} />
          </div>
          <div>
            <NewNumber newnumber={newNumber} onchange={handleNewNumberChange} />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      <h2>Numbers</h2>
      {personsToShow.map(persons =>
        <Yheystiedot key={persons.id} persons={persons} />
      )}

 
    </div>
  ) // return

} // App

export default App;
