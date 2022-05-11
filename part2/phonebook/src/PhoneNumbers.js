const Person = ({ person }) => <p>{person.name} {person.number}</p>

const Persons = ({ persons }) => persons.map(
  (person) => <Person person={person} key={person.name} />)

const PhoneNumbers = ({ persons }) => 
  <div>
    <h2>Numbers</h2>
    <Persons persons={persons} />
  </div>

export default PhoneNumbers
