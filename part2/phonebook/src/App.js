import { useState } from 'react'

const Button = ({ onClick, text }) => <button type="submit" onClick={onClick}> {text}</button>

const Person = ({ person }) => <p>{person.name}</p>

const Persons = ({ persons }) => persons.map((person) => <Person person={person} key={person.id} />)

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id:0 }
  ])
  const [newName, setNewName] = useState('')
  const [personsQT, setPersonsQT] = useState(1)

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleClick = (event) => {
    event.preventDefault()
    
    const newPersons = [...persons]
    const newPerson = { name: newName, id:personsQT }
    newPersons.push(newPerson)

    setPersons(newPersons)
    setPersonsQT(personsQT+1)
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
