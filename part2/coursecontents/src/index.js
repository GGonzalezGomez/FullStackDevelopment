import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
	return (
		<h1>{props.course.name}</h1>
	)
}

const Part = (props) => {
	return (
		<p>{props.part.name} {props.part.exercises} </p>
	)
}

const Content = (props) => props.course.parts.map(part =><Part part={part} key={part.id} />)

const Total = (props) => {
	var amt=0
	console.log(props)
	props.course.parts.map( obj => amt += obj.exercises  )
	return (
		<p>total of {amt} exercises</p>
	)
}

const Course = ({course}) => {
	return (
		<div>
		<Header course={course} />
		<Content course={course} />
		<Total course={course} />
		</div>
	)
}

const App = () => {
  const course = {
	  name: 'Half Stack application development',
          parts : [
	    {
	    name: 'Fundamentals of React',
	    exercises: 10,
	    id: 1
            },
  	    { 
	    name: 'Using props to pass data',
	    exercises: 7,
	    id: 2
	    },
            {
            name: 'State of a component',
            exercises: 14,
            id: 3
            }
	  ]
  }

  return (
    <div>
	  <Course course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
