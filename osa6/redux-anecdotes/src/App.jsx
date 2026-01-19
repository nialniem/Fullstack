import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => state.anecdotes)


  const vote = (id) => {
    dispatch({ type: 'VOTE', payload: id })
  }

  return (
    <div>
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
