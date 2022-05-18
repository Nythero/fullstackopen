import Button from './Button'
import PhonebookService from './PhonebookService'

const Person = ({ person }) => `${person.name} ${person.number}`

const PersonDisplay = ({ person, handleClick }) => {
  return (
    <div>
      <Person person={person} />
      <Button onClick={handleClick} text='delete' />
    </div>
  )
}

const Persons = ({ persons, setPersons, setNotificationMessage }) => {
  const handleClick = (person) => async () => {
    if(!window.confirm(`Delete ${person.name}?`))
      return
    try {
      await PhonebookService.remove(person.id)
      const newPersons = persons.filter(p => p.id !== person.id)
      setPersons(newPersons)
      setNotificationMessage({
        type: 'notificationSuccess',
        message: `Deleted ${person.name}.`
      })
    }
    catch(err) {
      setNotificationMessage({
        type: 'notificationError',
        message: `${person.name} has already been removed.`
      })
      const newPersons = persons.filter(p => p.name !== person.name)
      setPersons(newPersons)
    }
  }

  return persons.map(
    (person) => <PersonDisplay person={person} key={person.id} 
      handleClick={handleClick(person)} />
  )
}

const PhoneNumbers = ({ persons, setPersons, setNotificationMessage }) =>
  <div>
    <h2>Numbers</h2>
    <Persons persons={persons} setPersons={setPersons} 
      setNotificationMessage={setNotificationMessage}/>
  </div>

export default PhoneNumbers
