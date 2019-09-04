import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Value = ({text, value}) => (
  <p>{text} {value}</p>
)

const Button = ({clickFunction, text}) => ( 
  <button onClick={clickFunction}>
    {text}
  </button>
)


const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good+1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral+1)
  }

  const handleBadClick = () => {
    setBad(bad+1)
  }

  return (
    <div>
      <h2>give feedback</h2>
      <Button clickFunction={handleGoodClick} text='good' />
      <Button clickFunction={handleNeutralClick} text='neutral' />
      <Button clickFunction={handleBadClick} text='bad' />
      <h2>statistics</h2>
      <Value text='good' value={good} />
      <Value text='neutral' value={neutral} />
      <Value text='bad' value={bad} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)

