import { useSelector } from 'react-redux'

const isMoreVoted = (a1, a2) => a1.votes > a2.votes

const sortingFunction = (a1, a2) => {
  if(isMoreVoted(a1, a2))
    return -1
  else if(isMoreVoted(a2, a1))
    return 1
  else 
    return 0
}

const AnecdoteList = ({ voteAnecdote }) => {
  const anecdotes = useSelector(state => state.anecdotes)
  return [...anecdotes].sort(sortingFunction).map(anecdote =>
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={voteAnecdote(anecdote)}>vote</button>
      </div>
    </div>
  )
}

export default AnecdoteList
