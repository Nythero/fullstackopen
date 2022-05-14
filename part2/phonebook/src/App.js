import { useState, useEffect } from 'react'
import PhonebookService from './PhonebookService'

import Filter from './Filter'
import PhonebookForm from './PhonebookForm'
import PhoneNumbers from './PhoneNumbers'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    const request = async () => {
      const newPersons = await PhonebookService.getAll()
      setPersons(newPersons)
    }
    request()
  }, [])

  const handleValueChange = (stateSetter) => (event) => stateSetter(event.target.value)

  const nameContainsFilterName = (e) => e.name.includes(filterName)
  
  const setNewPhoneNumber = (value) => {
    const regex = /^[\d-]*$/
    if(regex.test(value)){
      setNewPhone(value)
    }
  }

  const handleClick = async (event) => {
    event.preventDefault()

    const personAlreadyExists = persons.some((p) => p.name === newName)

    let newPersons 

    if(newName === '' || newPhone === '') 
      return 0
    else if(personAlreadyExists) {
      if(!window.confirm(`${newName} already exists. Want to change the number?`))
        return 0

      const oldPerson = persons.find((p) => p.name === newName)
      const personData = { name: newName, number: newPhone, id:oldPerson.id }
  
      let newPerson
  
      try {
        newPerson = await PhonebookService.update(personData)
      }
      catch(err) {
        alert('Couldn\' update the person in the phonebook')
        return 0 
      }
  
      newPersons = persons.filter(p => p.name !== newPerson.name).concat(newPerson)
    }
    else {
      const personData = { name: newName, number: newPhone }
  
      let newPerson
  
      try {
        newPerson = await PhonebookService.create(personData)
      }
      catch(err) {
        alert('Couldn\' add the person to the phonebook')
        return 0 
      }
  
      newPersons = persons.concat(newPerson)
    }
    setPersons(newPersons)
    setNewName('')
    setNewPhone('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterName} onChange={handleValueChange(setFilterName)} />
      <PhonebookForm newName={newName} 
        onNameChange={handleValueChange(setNewName)}
        newPhone={newPhone}
        onPhoneChange={handleValueChange(setNewPhoneNumber)}
        onButtonClick={handleClick}
      />
      <PhoneNumbers persons={persons.filter(nameContainsFilterName)}
        setPersons={setPersons}/>
    </div>
  )
}

export default App;
