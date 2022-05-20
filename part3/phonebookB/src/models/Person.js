const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
mongoose.connect(url)

const numberValidator = (v) => {
  const regex = /^\d{2,3}-\d+$/
  return regex.test(v)
}

async function nameValidator(v){
  //This is necessary since create and update mongoose methods
  //have different contexts
  let model 
  let id
  try {
    model = this.model('Person')
  }
  catch(err) {
    model = this.model
    id = this._conditions._id.toString()
  }

  const person = await model.findOne({ name: v })
  const personSameId = (person === null) || ((id !== undefined) && (person.id.toString() === id))
  return personSameId
}

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
    validate: {
      validator: nameValidator,
      message: props => `An entry with the name ${props.value} already exists.`
    }
  },
  number: {
    type: String,
    minLength: 8,
    required: true,
    validate: numberValidator
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Person = mongoose.model('Person', personSchema)

module.exports = Person
