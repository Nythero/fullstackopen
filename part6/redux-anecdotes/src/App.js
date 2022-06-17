import { useDispatch } from 'react-redux'
import { vote, newAnecdote } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import { notify, clear } from './reducers/notificationReducer'

const App = () => {
  const dispatch = useDispatch()

  const showNotification = (notification) => {
    dispatch(notify(notification))
    setTimeout(() => dispatch(clear()), 5000)
  }

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(newAnecdote(content))
    showNotification(`Added new anecdote: ${content}`)
  }

  const voteAnecdote = (anecdote) => () => {
    dispatch(vote(anecdote.id))
    showNotification(`You voted '${anecdote.content}'`)
  }
  
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
