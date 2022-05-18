const express = require('express')
const Router = express.Router()

const Person = require('../models/Person.js')

Router.get('/', async (req, res) => {
  const people = await Person.find({})
  res.status(200).json(people)
})

Router.get('/:id', async (req, res) => {
  const id = req.params.id
  try {
    const people = await Person.find({ _id:id })
    if(people.length === 0) 
      res.status(404).json({error:'Not Found'})
    else 
      res.status(200).json(people)
  }
  catch(err) {
    res.status(400).json({error:`${id} is an invalid Id`})
  }
})

Router.delete('/:id', async (req, res) => {
  const id = req.params.id
  await Person.deleteOne({ _id:id })
  
  res.status(204).end()
})

Router.post('/', async (req, res) => {
  const { name, number } = req.body
  
  if(!name)
    return res.status(400).json({error:'Missing name'})
  else if(!number)
    return res.status(400).json({error:'Missing number'})

  const personData = { name, number }
  const person = new Person(personData) 
  await person.save()

  res.status(201).json(person)
})

module.exports = Router
