const mongoose = require('mongoose')

if(process.argv.length !== 3 && process.argv.length !== 5) {
  console.log('Usage:')
  console.log('node mongo.js <password> - get all the people')
  console.log('node mongo.js <password> <name> <number> - add the person with given name and number to the phonebook')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://root:${password}@cluster0.v8l9l.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

const savePerson = async () => {
  const name = process.argv[3]
  const number = process.argv[4]
  const person = new Person({
    name: name,
    number: number
  })
  await person.save()
  console.log(`added ${person.name} number ${person.number} to the phonebook`)
  mongoose.connection.close()
}

const getPeople = async () => {
  const people = await Person.find({})
  people.forEach(console.log)
  mongoose.connection.close()
}

if(process.argv.length === 5) {
  savePerson()
}
else if(process.argv.length === 3) {
  getPeople()
}
