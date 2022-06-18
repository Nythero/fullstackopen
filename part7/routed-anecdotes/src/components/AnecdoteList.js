import { Link } from 'react-router-dom'

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => {
        const link = `/anecdotes/${anecdote.id}`
        return (
          <li key={anecdote.id}>
            <Link to={link}>
              {anecdote.content}
            </Link>
          </li>
	)
      })}
    </ul>
  </div>
)

export default AnecdoteList
