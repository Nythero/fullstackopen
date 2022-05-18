import axios from 'axios'

//This is needed because I wanted to access the website from my local network
const path = window.location.href.replace(/:[^/]\S*/, ':3001/api/persons')

const getAll = async () => {
  const response = await axios.get(path)
  console.log('Response: ', response)
  return response.data  
}

const create = async (newPerson) => {
  const response = await axios.post(path, newPerson)
  return response.data
}

const remove = async (personId) => {
  const response = await axios.delete(`${path}/${personId}`)
  return response.data
}

const update = async (newPerson) => {
  const response = await axios.put(`${path}/${newPerson.id}`, newPerson)
  return response.data
}

const PhonebookService = { getAll, create, remove, update }

export default PhonebookService
