import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'



const Button = (props) => (<button onClick={props.onClick}>{props.text}</button>)


const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad

  if (total === 0) {
    return <p>No feedback given</p>
  }

  const average = (good - bad) / total
  const positive = Math.round((good / total) * 1000) / 10 // 1 decimal

  return (
    <div>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All: {total}</p>
      <p>Average: {average.toFixed(2)}</p>
      <p>Positive: {positive}%</p>
    </div>
  )
}



function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  
  

  return (
    <div>
      <h1>Give Feedback</h1>    
      <Button onClick={() => setGood(good +1)} text="Good" />
      <Button onClick={() => setNeutral(neutral +1)} text="Neutral" />
      <Button onClick={() => setBad(bad + 1)} text="Bad" />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
