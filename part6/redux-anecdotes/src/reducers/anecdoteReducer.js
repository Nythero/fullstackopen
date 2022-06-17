import { createSlice } from '@reduxjs/toolkit'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const withOneMoreVote = (anecdote) => {
  const newAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
  return newAnecdote
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'VOTE':
      const { id } = action.data
      return state.map(a => (a.id === id)? withOneMoreVote(a) : a)
    case 'NEW':
      const { content } = action.data
      return state.concat(asObject(content))
    default:
      return state
  }
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
      const content = action.payload
      return state.concat(asObject(content))    
    }
  }
})

export const { vote, newAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer
