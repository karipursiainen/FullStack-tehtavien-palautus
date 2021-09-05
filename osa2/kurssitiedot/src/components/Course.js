import React from 'react'

const Course = ({ course }) => {
    console.log('Course')
    
    return (
      <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </div>
    )
  
  }
  
  const Total = ({course}) => {
    // taulukkoon tehtävien lkm
    const result = course.parts.map(part => part.exercises)
  
    // lasketaan taulukon arvot yhteen
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    console.log(result.reduce(reducer))
    //console.log(result, totalexerc)
  
    return (
      <div>
        <p><b>total of {result.reduce(reducer)} exercises</b></p>
      </div>
    )
  
  }
  
  const Content = ({course}) => {
    console.log('Content')
    return (
      <div>
       
          {course.parts.map(parts =>
            <Part key={parts.id} parts={parts} />
          )}
      </div>
    )
  }
  const Part = ({parts}) => {
    console.log('Part')
    return (
        <p>{parts.name} {parts.exercises}</p>
    )
  }
  
       
  const Header = ({course}) => {
    console.log('Header')
    return (
        <h2>{course.name}</h2>
    )
  }

  export default Course