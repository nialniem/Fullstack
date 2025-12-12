const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}
const Part = (props) => {
  return (
    <p>
      {props.name} {props.number}
    </p>
  )
}
const Content = (props) => {
  return (
    <div>
      <Part name={props.exercises[0].name} number={props.exercises[0].number} />
      <Part name={props.exercises[1].name} number={props.exercises[1].number} />
      <Part name={props.exercises[2].name} number={props.exercises[2].number} />
    </div>
  )
}
const Total = (props) => {
  const total =
    props.exercises[0].number +
    props.exercises[1].number +
    props.exercises[2].number

  return <p>Number of exercises {total}</p>
}


const App = () => {
  const course = 'Half Stack application development'
  const exercises = [
    { name: 'Fundamentals of React', number: 10 },
    { name: 'Using props to pass data', number: 7 },
    { name: 'State of a component', number: 14 },
  ]
  return (
    <div>
      <Header course={course} />
      <Content exercises={exercises} />
      <Total exercises={exercises} />
    </div>
  )
}
export default App