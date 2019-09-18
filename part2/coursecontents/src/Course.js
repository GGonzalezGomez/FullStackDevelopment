import React from 'react'

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

export default Course
