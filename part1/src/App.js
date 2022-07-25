import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)
const StatisticLine = (props) => {
  return<div>{props.text} {props.value} {props.value2}</div>
}



const Statistics = (props) => {
  if (props.total === 0) {
    return (
      <div>
        no feedback given
      </div>
    )
  }
  return ( 
  
  <table>
    <tbody>
    <tr>
      <td><StatisticLine text="good"  /></td>
      <td><StatisticLine value ={props.good}  /></td>
    </tr>
    <tr>
      <td><StatisticLine text="neutral" /></td>
      <td><StatisticLine value ={props.neutral}  /></td>
    </tr>
    <tr>
      <td><StatisticLine text="bad" /></td>
      <td><StatisticLine value ={props.bad}  /></td>
    </tr>
    <tr>
      <td><StatisticLine text="all" /></td>
      <td><StatisticLine value ={props.good+props.bad+props.neutral}  /></td>
    </tr>
    <tr>
      <td><StatisticLine text="average" /></td>
      <td><StatisticLine value ={(props.good*1+props.bad*(-1))/(props.good+props.bad+props.neutral)}  /></td>
    </tr>
    <tr>
      <td><StatisticLine text="positive" /></td>
      <td><StatisticLine value ={props.good/(props.good+props.bad+props.neutral)*100}  /></td>
      <td><StatisticLine value2 ="%"  /></td>
    </tr>
    </tbody>
  </table>
  
  )
}

  
const App = () => {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good+1)} text="good" />
      <Button handleClick={() => setNeutral(neutral+1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <br/>
      <h2>statistics</h2>
      <Statistics total = {good+bad+neutral} good = {good} bad = {bad} neutral={neutral} /> 
      <br/>
    </div>
  )
}

export default App