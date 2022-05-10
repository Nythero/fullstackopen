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

const Courses = ({ courses }) => courses.map(c => <Course course={c} key={c.id} />)

const App = () => {
  const courses = [{
    id: 1,
    name: 'Half Stack application development',
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
      }
    ]
  },
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
    ]
  }]

  return <Courses courses={courses} />
}

export default App
