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

    if(newName === '' || newPhone === '') 
      return 0
    else if(persons.find((e) => e.name === newName)) {
      alert(`${newName} is already added to the phonebook`)
      return 0
    }

    const personData = { name: newName, number: newPhone }

    let newPerson

    try {
      newPerson = await PhonebookService.create(personData)
    }
    catch(err) {
      alert('Couldn\' add the person to the phonebook')
      return 0 
    }

    const newPersons = persons.concat(newPerson)
    
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
      <PhoneNumbers persons={persons.filter(nameContainsFilterName)} />
    </div>
  )
}

export default App;
