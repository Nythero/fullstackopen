import { useState } from 'react'

const Title = (props) => <h1>{props.title}</h1>

const Button = (props) => (<button onClick={props.onClick}>
  {props.name}
</button>)

const Statistic = (props) => <p>{props.name} {props.quantity}</p>

const Statistics = (props) => {

  const { good, neutral, bad } = props.feedback

  const total = good + neutral + bad
  const average = (total === 0)? "0" : ((good - bad) / total)
  const positive = (total === 0)? "0 %" : `${good / total *100} %`

  return <>
    <Title title="statistics" />
    <Statistic name="good" quantity={good} />
    <Statistic name="neutral" quantity={neutral} />
    <Statistic name="bad" quantity={bad} />
    <Statistic name="total" quantity={total} />
    <Statistic name="average" quantity={average} />
    <Statistic name="positive" quantity={positive} />
  </>
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick = (state, setState) => () => setState(state + 1)

  const feedback = { good: good, neutral: neutral, bad: bad }

  return (
    <div>
      <Title title="give feedback"/>
      <Button name="good" onClick={handleClick(good, setGood)} />
      <Button name="neutral" onClick={handleClick(neutral, setNeutral)} />
      <Button name="bad" onClick={handleClick(bad, setBad)} />
      <Statistics feedback={feedback}/>
    </div>
  );
}

export default App;
