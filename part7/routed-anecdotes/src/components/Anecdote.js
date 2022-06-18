import { useParams } from 'react-router-dom'

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  const anecdote = anecdotes.find(a => a.id === Number(id))
  console.log(anecdote)
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>{anecdote.author}</p>
      <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
      <p>has {anecdote.votes} votes</p>
    </div>
  )
}

export default Anecdote
