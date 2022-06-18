import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initiliazeAnecdotes, createAnecdote, voteAnecdote } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { notify, clear } from './reducers/notificationReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initiliazeAnecdotes())
  }, [dispatch])

  const showNotification = (notification) => {
    dispatch(notify(notification))
    setTimeout(() => dispatch(clear()), 5000)
  }

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    showNotification(`Added new anecdote: ${content}`)
  }

  const vote = (anecdote) => () => {
    dispatch(voteAnecdote(anecdote))
    showNotification(`You voted '${anecdote.content}'`)
  }
  
  return (
    <div>
      <Notification />     
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList vote={vote}/>
      <AnecdoteForm addAnecdote={addAnecdote}/>
    </div>
  )
}

export default App
