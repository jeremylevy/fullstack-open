import React from 'react'

const Header = (props) => <h1>{props.course}</h1>

const Part = (props) => (
  <p>
    {props.part} {props.exercises}
  </p>
)

const Content = ({ parts }) => parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises} />)

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
    </div>
  )
}

export default Course
