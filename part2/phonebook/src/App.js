import { useState } from 'react'

const Button = ({ onClick, text }) => <button type="submit" onClick={onClick}> {text}</button>

const Person = ({ person }) => <p>{person.name} {person.phone}</p>

const Persons = ({ persons }) => persons.map(
  (person) => <Person person={person} key={person.name} />)

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '123-456-789' }
  ])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  const handleValueChange = (stateSetter) => (event) => stateSetter(event.target.value)

  const setNewPhoneNumber = (value) => {
    const regex = /^[\d-]*$/
    if(regex.test(value)){
      setNewPhone(value)
    }
  }

  const handleClick = (event) => {
    event.preventDefault()

    if(newName === '' || newPhone === '') 
      return 0
    else if(persons.find((e) => e.name === newName)) {
      alert(`${newName} is already added to the phonebook`)
      return 0
    }

    const newPersons = [...persons]
    const newPerson = { name: newName, phone: newPhone }

    newPersons.push(newPerson)
    
    setPersons(newPersons)
    setNewName('')
    setNewPhone('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleValueChange(setNewName)} />
	  phone number: <input 
	    value={newPhone}
	    onChange={handleValueChange(setNewPhoneNumber)} />
        </div>
        <div>
          <Button onClick={handleClick} text='add' />
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  )
}

export default App;
