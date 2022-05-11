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
    
    const newPersons = [...persons]
    const newPerson = { name: newName }

    const pushNoRepeated = (elem, array, comparatorFactory = (elem) => (e) => e == elem) => {
      const comparator = comparatorFactory(elem)
      if(!array.find(comparator)) {
        array.push(elem)
      }
    }
    const nameComparator = (elem) => (e) => e.name === elem.name

    pushNoRepeated(newPerson, newPersons, nameComparator)

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
