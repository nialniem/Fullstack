const Part = ({content}) => {
  if(content.length <=1){
    return <p>{content[0]}</p>
  }
    var i = 0;
    return (
    <div>
    <p>{content[i++]}</p>
    <p>{content[i++]}</p>
    <p>{content[i++]}</p>
    <p>{content[i++]}</p>
    <p>{content[i++]}</p>
    <p>{content[i++]}</p>
    <p>{content[i++]}</p>
    <p>{content[i++]}</p>
    <p>{content[i++]}</p>
    <p>{content[i++]}</p>
    <p>{content[i++]}</p>
    <p>{content[i++]}</p>
    <p>{content[i++]}</p>
    <p>{content[i++]}</p>
    <p>{content[i++]}</p>

    </div>
    )
    }
  
  


function reducer(previous, current, index) {
  const returns = previous + current;
  console.log(`previous: ${previous}, current: ${current}, index: ${index}, returns: ${returns}`);
  console.log(returns)
  return returns;
}


const Points = ({yht}) => {
 yht = yht.map(Number);
  yht = yht.reduce(reducer)
  console.log(yht)
  return <b>total of {yht} exercises</b>
}
 


const Content = ({parts}) => {
  
    const content = parts.map(function(part){

      
        return part.name +' '+part.exercises
      
    })
    console.log(content)
     
  
    const yht = parts.map(function(part){

      return part.exercises + ''
    
  })
  console.log(yht)
  
      
    return (
      <div>
      <Part content = {content}> </Part> 
      <Points yht = {yht}> </Points>
      </div>
    )
    
    }




const Course = ({ course }) => {


  return (
    <div>
      <h1>Web development curriculum</h1>
      <h2>{course[0].name}</h2>
      <Content parts = {course[0].parts}/>
      <h2>{course[1].name}</h2>
      <Content parts = {course[1].parts}/>
    </div> 
  ) 
}



export default Course