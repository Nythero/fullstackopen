const express = require('express')
const Router = express.Router()

const Person = require('../models/Person.js')

Router.get('/', async (req, res, next) => {
  try {
    const people = await Person.find({})
    res.status(200).json(people)
  }
  catch(err) {
    next(err)
  }
})

Router.get('/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    const person = await Person.findById(id)
    if(person)
      res.status(200).json(person)
    else
      res.status(404).json({ error:'Not Found' })
  }
  catch(err) {
    next(err)
  }
})

Router.delete('/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    await Person.findByIdAndRemove(id)
    res.status(204).end()
  }
  catch(err) {
    next(err)
  }
})

Router.post('/', async (req, res, next) => {
  const { name, number } = req.body

  const personData = { name, number }
  try{
    const person = new Person(personData)
    await person.save()
    console.log('person', person)
    res.status(201).json(person)
  }
  catch(err){
    next(err)
  }
})

Router.put('/:id', async (req, res, next) => {
  const { name, number } = req.body
  const id = req.params.id


  const newPersonData = (name, number) => {
    const newUnset = (name, number) => {
      const $unsetName = (name)? {} : { name: 1 }
      const $unsetNumber = (number)? {} : { number : 1 }
      return { ...$unsetName, ...$unsetNumber }
    }
    const newSet = (name, number) => {
      const $setName = (name)? { name: name } : {}
      const $setNumber = (number)? { number: number } : {}
      return { ...$setName, ...$setNumber }
    }
    const $unset = newUnset(name, number)
    const $set = newSet(name, number)

    return { $unset, $set }
  }

  const personData = newPersonData(name, number)
  console.log('personData: ', personData)

  try {
    const updatedPerson = await Person.findByIdAndUpdate(id, personData,
      {
        new: true,
        runValidators: true,
        context: 'query'
      })
    if(updatedPerson === null)
      return res.status(404).json({ error: 'Not Found' })
    console.log(updatedPerson)
    res.status(200).json(updatedPerson)
  }
  catch(err) {
    next(err)
  }
})

module.exports = Router
