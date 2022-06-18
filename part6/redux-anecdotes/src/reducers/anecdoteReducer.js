import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'

const asObject = (anecdote) => {
  return {
    content: anecdote,
    votes: 0
  }
}

const initialState = []

const withOneMoreVote = (anecdote) => {
  const newAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
  return newAnecdote
}

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState,
  reducers: {
    vote(state, action) {
      const id = action.payload
      return state.map(a => (a.id === id)? withOneMoreVote(a) : a)    
    },
    newAnecdote(state, action) {
      const anecdote = action.payload
      return state.concat(anecdote)    
    },
    set(state, action) {
      return action.payload
    }
  }
})

export const { vote, newAnecdote, set } = anecdoteSlice.actions

export const initiliazeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(set(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const anecdoteData = asObject(content)
    const anecdote = await anecdotesService.create(anecdoteData)
    dispatch(newAnecdote(anecdote))
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const anecdoteData = { ...anecdote, votes: anecdote.votes + 1 }
    const updatedAnecdote = await anecdotesService.update(anecdoteData)
    const id = updatedAnecdote.id
    dispatch(vote(id))
  }
}

export default anecdoteSlice.reducer
