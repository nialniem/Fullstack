import { useDispatch, useSelector } from 'react-redux'
import { createAnecdote, voteAnecdote } from './reducers/anecdoteReducer'


const App = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => state.anecdotes)

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    dispatch(createAnecdote(content))
    event.target.anecdote.value = ''
  }

  const vote = (id) => {
    dispatch({ type: 'VOTE', payload: id })
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
      {anecdotes.map((a) => (
        <div key={a.id}>
          <div>{a.content}</div>
          <div>
            has {a.votes}
            <button onClick={() => vote(a.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
