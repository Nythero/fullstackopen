import axios from 'axios'

const baseUrl = window.location.href.replace(/:[^/]\S*/, ':3001/anecdotes')

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const anecdoteService = { getAll }

export default anecdoteService
