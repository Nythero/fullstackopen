const Anecdote = ({ anecdote, voteAnecdote }) => {
  return (
    <div>
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

export default Anecdote
