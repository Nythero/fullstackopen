import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initiliazeAnecdotes, createAnecdote, voteAnecdote } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initiliazeAnecdotes())
  }, [dispatch])

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(setNotification(`Added new anecdote: ${content}`, 5))
  }

  const vote = (anecdote) => () => {
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(`You voted '${anecdote.content}'`, 5))
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
