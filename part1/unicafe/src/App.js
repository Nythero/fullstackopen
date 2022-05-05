import { useState } from 'react'

const Title = () => <h1>give feedback</h1>

const Button = (props) => (<button onClick={props.onClick}>
  {props.name}
</button>)

const Feedback = (props) => <p>{props.name} {props.quantity}</p>

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick = (state, setState) => () => setState(state + 1)
  
  return (
    <div>
      <Title />
      <Button name="good" onClick={handleClick(good, setGood)} />
      <Button name="neutral" onClick={handleClick(neutral, setNeutral)} />
      <Button name="bad" onClick={handleClick(bad, setBad)} />
      <Feedback name="good" quantity={good} />
      <Feedback name="neutral" quantity={neutral} />
      <Feedback name="bad" quantity={bad} />
    </div>
  );
}

export default App;
