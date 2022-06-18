import { Link } from 'react-router-dom'

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => {
        const link = `/anecdotes/${anecdote.id}`
        return <Link key={anecdote.id} to={link}>
          {anecdote.content}
        </Link>
      })}
    </ul>
  </div>
)

export default AnecdoteList
