import { useSelector, useDispatch } from 'react-redux'
import { vote, newAnecdote } from './reducers/anecdoteReducer.js'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(newAnecdote(content))
  }

  const voteAnecdote = (anecdote) => () => dispatch(vote(anecdote.id))
  
  return (
    <div>
      <Notification />     
      <h2>Anecdotes</h2>
      <AnecdoteList voteAnecdote={voteAnecdote}/>
      <AnecdoteForm addAnecdote={addAnecdote}/>
    </div>
  )
}

export default App
