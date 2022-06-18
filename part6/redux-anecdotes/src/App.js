import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { vote, newAnecdote, set } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { notify, clear } from './reducers/notificationReducer'
import anecdotesService from './services/anecdotes'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const effect = async () => {
      const anecdotes = await anecdotesService.getAll()
      dispatch(set(anecdotes))
    }
    effect()
  }, [dispatch])

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
      <Filter />
      <AnecdoteList voteAnecdote={voteAnecdote}/>
      <AnecdoteForm addAnecdote={addAnecdote}/>
    </div>
  )
}

export default App
