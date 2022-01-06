import React from 'react'

const Header = (props) => <h1>{props.course}</h1>

const Part = (props) => (
  <p>
    {props.part} {props.exercises}
  </p>
)

const Content = ({ parts }) => parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises} />)

const Total = ({ parts }) => (
  <p>
    total of {parts.reduce((acc, part) => acc += part.exercises, 0)} exercises
  </p>
)

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course
