import { useSelector } from 'react-redux'
import Anecdote from './Anecdote'

const isMoreVoted = (a1, a2) => a1.votes > a2.votes

const sortingFunction = (a1, a2) => {
  if(isMoreVoted(a1, a2))
    return -1
  else if(isMoreVoted(a2, a1))
    return 1
  else 
    return 0
}

const sortedByVotes = (anecdotes) => [...anecdotes].sort(sortingFunction)

const doesAnecdoteInclude = (string) => (anecdote) => anecdote.content.includes(string)

const AnecdoteList = ({ voteAnecdote }) => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state=> state.filter)

  const componentMapping = anecdote => <Anecdote 
    key={anecdote.id}
    anecdote={anecdote}
    voteAnecdote={voteAnecdote}/>

  return sortedByVotes(anecdotes).filter(doesAnecdoteInclude(filter)).map(componentMapping)
}

export default AnecdoteList
