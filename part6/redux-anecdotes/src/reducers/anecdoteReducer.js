import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
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
export default anecdoteSlice.reducer
