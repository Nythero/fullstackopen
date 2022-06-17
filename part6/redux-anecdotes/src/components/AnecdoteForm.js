const AnecdoteForm = ({ addAnecdote }) => {
  return (
    <form onSubmit={addAnecdote}>
      <div><input name='anecdote'/></div>
      <button>create</button>
    </form>
  )
}

export default AnecdoteForm
