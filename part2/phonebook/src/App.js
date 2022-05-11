import { useState } from 'react'

const Button = ({ onClick, text }) => <button type="submit" onClick={onClick}> {text}</button>

const Person = ({ person }) => <p>{person.name}</p>

const Persons = ({ persons }) => persons.map(
  (person) => <Person person={person} key={person.name} />)

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => setNewName(event.target.value)

  const handleClick = (event) => {
    event.preventDefault()

    if(newName === '') 
      return 0
    else if(persons.find((e) => e.name === newName)) {
      alert(`${newName} is already added to the phonebook`)
      return 0
    }

    const newPersons = [...persons]
    const newPerson = { name: newName }

    newPersons.push(newPerson)
    
    setPersons(newPersons)
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
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
