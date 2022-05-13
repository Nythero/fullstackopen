import axios from 'axios'

//This is needed because I wanted to access the website from my local network
const path = window.location.href.replace(/:[^/]\S*/, ':3001/persons')

const getAll = async () => {
  const response = await axios.get(path)
  
  return response.data  
}

const create = async (newPerson) => {
  const response = await axios.post(path, newPerson)

  return response.data
}

const PhonebookService = { getAll, create }

export default PhonebookService
