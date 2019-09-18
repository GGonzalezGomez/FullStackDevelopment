import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
	return (
		<h2>{props.course.name}</h2>
	)
}

const Part = (props) => {
	return (
		<p>{props.part.name} {props.part.exercises} </p>
	)
}

const Content = (props) => props.course.parts.map(part =><Part part={part} key={part.id} />)

const Total = (props) => {
	var amt=props.course.parts.reduce(function(t,n){return t+n.exercises},0)
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
	const courses = [
    		{
      			name: 'Half Stack application development',
      			id: 1,
      			parts: [
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
			        },
			        {
			        name: 'Redux',
			        exercises: 11,
			        id: 4
			        }
			      ]},
    		{
      			name: 'Node.js',
		        id: 2,
		        parts: [
			        {
			        name: 'Routing',
			        exercises: 3,
			        id: 1
			        },
				{
			        name: 'Middlewares',
			        exercises: 7,
			        id: 2
			        }
      				]}
  	]

  return (
    <div>
	  <h1>Wed development curriculum</h1>
	  {courses.map( course => <Course course={course} key={course.id} />)}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
