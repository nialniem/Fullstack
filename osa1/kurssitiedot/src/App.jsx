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
      {props.name} {props.exercises}
    </p>
  )
}
const Content = (props) => {
  return (
    <div>
      <Part name={props.exercises[0].name} exercises={props.exercises[0].exercises} />
      <Part name={props.exercises[1].name} exercises={props.exercises[1].exercises} />
      <Part name={props.exercises[2].name} exercises={props.exercises[2].exercises} />
    </div>
  )
}
const Total = (props) => {
  const total =
    props.exercises[0].exercises +
    props.exercises[1].exercises +
    props.exercises[2].exercises

  return <p>Number of exercises {total}</p>
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  
  return (
    <div>
      <Header course={course.name} />
      <Content exercises={course.parts} />
      <Total exercises={course.parts}/>
           
    </div>
  )
}
export default App