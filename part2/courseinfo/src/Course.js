const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0) 

  return <p>Number of exercises { total }</p>
}

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ parts }) => parts.map(p => <Part part={p} key={p.id}/>) 

const Course = ({ course }) => <>
  <Header course={course.name} />
  <Content parts={course.parts} />
  <Total parts={course.parts} />
</>

export default Course
