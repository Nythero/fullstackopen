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
      res.status(404).json({error:'Not Found'})
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
  
  if(!name)
    return res.status(400).json({error:'Missing name'})
  else if(!number)
    return res.status(400).json({error:'Missing number'})

  const personData = { name, number }
  const person = new Person(personData) 
  try{
    await person.save()
    res.status(201).json(person)
  }
  catch(err){
    next(err)
  }
})

Router.put('/:id', async (req, res, next) => {
  const { name, number } = req.body
  const id = req.params.id

  if(!name)
    return res.status(400).json({error:'Missing name'})
  else if(!number)
    return res.status(400).json({error:'Missing number'})

  const personData = { name, number } 

  try {
    const updatedPerson = await Person.findByIdAndUpdate(id, personData, { new: true })
    res.status(200).json(updatedPerson)
  }
  catch(err) {
    next(err)
  }
})

module.exports = Router
