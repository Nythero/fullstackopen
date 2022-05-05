import { useState } from 'react'

const Title = () => <h1>give feedback</h1>

const Button = (props) => (<button onClick={props.onClick}>
  {props.name}
</button>)

const Statistic = (props) => <p>{props.name} {props.quantity}</p>

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick = (state, setState) => () => setState(state + 1)
  
  const total = good + neutral + bad
  const average = (total === 0)? "0" : ((good - bad) / total)
  const positive = (total === 0)? "0 %" : `${good / total *100} %`

  return (
    <div>
      <Title />
      <Button name="good" onClick={handleClick(good, setGood)} />
      <Button name="neutral" onClick={handleClick(neutral, setNeutral)} />
      <Button name="bad" onClick={handleClick(bad, setBad)} />
      <Statistic name="good" quantity={good} />
      <Statistic name="neutral" quantity={neutral} />
      <Statistic name="bad" quantity={bad} />
      <Statistic name="total" quantity={total} />
      <Statistic name="average" quantity={average} />
      <Statistic name="positive" quantity={positive}/>
    </div>
  );
}

export default App;
