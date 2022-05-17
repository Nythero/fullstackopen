import Button from './Button'
import PhonebookService from './PhonebookService'

const addNewPerson = async (persons, setPersons, person, setNotificationMessage) => {
  try {
    const newPerson = await PhonebookService.create(person)
    const newPersons = persons.concat(newPerson)
    setPersons(newPersons)
    setNotificationMessage({
      type: 'notificationSuccess',
      message: `Added ${newPerson.name} to the phonebook.`
    })
  }
  catch(err) {
    setNotificationMessage({
      type: 'notificationError',
      message: `Couldn't add ${person.name} to the phonebook.`
    })
  }
}

const updatePerson = async (persons, setPersons, person, setNotificationMessage) => {
  const oldPerson = persons.find((p) => p.name === person.name)
  try {
    const personData = { ...person, id: oldPerson.id }
    const newPerson = await PhonebookService.update(personData)
    const newPersons = persons.filter(p => p.name !== newPerson.name).concat(newPerson)
    setPersons(newPersons)
    setNotificationMessage({
      type: 'notificationSuccess',
      message: `Updated ${newPerson.name}.`
    })
  }
  catch(err) {
    setNotificationMessage({
      type: 'notificationError',
      message: `${person.name} has been removed from the server.`
    })
    const newPersons = persons.filter(p => p.name !== person.name)
    setPersons(newPersons)
  }
}

const handleAddClick = (persons, setPersons, person, setPerson, setNotificationMessage) => async (event) => {
  event.preventDefault()

  const personAlreadyExists = persons.some((p) => p.name === person.name)

  if(person.name === '' || person.phone === '')
    return
  else if(personAlreadyExists) {
    if(!window.confirm(`${person.name} already exists. Want to change the number?`))
      return
    await updatePerson(persons, setPersons, person, setNotificationMessage)
  }
  else 
    await addNewPerson(persons, setPersons, person, setNotificationMessage)
  setPerson({name: '', number: ''})
}

const PhonebookForm = ({ person, setPerson, persons, setPersons, setNotificationMessage }) => {
  const onNameChange = (event) => {
    const newName = event.target.value
    const newPerson = {...person, name: newName}
    setPerson(newPerson)
  }

  const onNumberChange = (event) => {
    const newNumber = event.target.value

    const regex = /^[\d-]*$/
    if(regex.test(newNumber)){
      const newPerson = {...person, number: newNumber}
      setPerson(newPerson)
    }
  }

  const onAddClick = handleAddClick(persons, setPersons, person, setPerson, setNotificationMessage)

  return (
    <form>
      <h2>add a new entry</h2>
      <div>
        <label>name:</label>
        <input value={person.name} onChange={onNameChange} />
        <label>phone number:</label>
        <input value={person.number} onChange={onNumberChange} />
      </div>
      <div>
        <Button onClick={onAddClick}text='add' />
      </div>
    </form>
  )
}

export default PhonebookForm
