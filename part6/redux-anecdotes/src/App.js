import { useSelector, useDispatch } from 'react-redux'
import { vote, newAnecdote } from './reducers/anecdoteReducer.js'
import AnecdoteForm from './components/AnecdoteForm'

const isMoreVoted = (a1, a2) => a1.votes > a2.votes

const sortingFunction = (a1, a2) => {
  if(isMoreVoted(a1, a2))
    return -1
  else if(isMoreVoted(a2, a1))
    return 1
  else 
    return 0
}

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(newAnecdote(content))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {[...anecdotes].sort(sortingFunction).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <AnecdoteForm addAnecdote={addAnecdote}/>
    </div>
  )
}

export default App
