import axios from 'axios'

const baseUrl = window.location.href.replace(/:[^/]\S*/, ':3001/anecdotes')

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (anecdoteData) => {
  const response = await axios.post(baseUrl, anecdoteData)
  return response.data
}

const update = async (anecdoteData) => {
  const id = anecdoteData.id
  const response = await axios.put(`${baseUrl}/${id}`, anecdoteData)
  return response.data
}

const anecdoteService = { getAll, create, update }

export default anecdoteService
