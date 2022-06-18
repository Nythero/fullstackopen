import axios from 'axios'

const baseUrl = window.location.href.replace(/:[^/]\S*/, ':3001/anecdotes')

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const post = async (anecdoteData) => {
  const response = await axios.post(baseUrl, anecdoteData)
  return response.data
}

const anecdoteService = { getAll, post }

export default anecdoteService
