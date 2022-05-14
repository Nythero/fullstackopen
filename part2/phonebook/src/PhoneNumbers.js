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

const Persons = ({ persons, setPersons }) => {
  const handleClick = (person) => async () => {
    if(!window.confirm(`Delete ${person.name}?`)){
      return 0
    }
    await PhonebookService.remove(person.id)

    const newPersons = persons.filter(p => p.name !== person.name)

    setPersons(newPersons)
  }

  return  persons.map(
    (person) => <PersonDisplay person={person} key={person.name} 
      handleClick={handleClick(person)} />
  )
}

const PhoneNumbers = ({ persons, setPersons }) =>
  <div>
    <h2>Numbers</h2>
    <Persons persons={persons} setPersons={setPersons}/>
  </div>

export default PhoneNumbers
