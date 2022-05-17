import { useState, useEffect } from 'react'
import PhonebookService from './PhonebookService'

import Filter from './Filter'
import PhonebookForm from './PhonebookForm'
import PhoneNumbers from './PhoneNumbers'
import NotificationMessage from './NotificationMessage'

const App = () => {
  const [persons, setPersons] = useState([])
  const [person, setPerson] = useState({ name: '', number:'' })
  const [filterName, setFilterName] = useState('')
  const [notificationMessage, setNotificationMessage] = useState({})

  useEffect(() => {
    const request = async () => {
      const newPersons = await PhonebookService.getAll()
      setPersons(newPersons)
    }
    request()
  }, [])

  const handleValueChange = (stateSetter) => (event) => stateSetter(event.target.value)

  const personNameContains = (name) => (p) => p.name.includes(name)

  const filteredPersons = persons.filter(personNameContains(filterName))

  const showNotificationMessage = (message) => {
    setNotificationMessage(message)
    setTimeout(() => setNotificationMessage({}), 4000)
  }
	
  return (
    <div>
      <h2>Phonebook</h2>
      <NotificationMessage notificationMessage={notificationMessage} />
      <Filter value={filterName} onChange={handleValueChange(setFilterName)} />
      <PhonebookForm person={person} setPerson={setPerson} 
	persons={persons} setPersons={setPersons} 
	setNotificationMessage={showNotificationMessage}/>
      <PhoneNumbers persons={filteredPersons} setPersons={setPersons} 
	setNotificationMessage={showNotificationMessage}/>
    </div>
  )
}

export default App;
