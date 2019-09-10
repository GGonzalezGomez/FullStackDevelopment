import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({good,neutral,bad,all,avg,pos}) => { 
  return(
  <div>
    <h2>statistics</h2>
    <p>good {good}</p>
    <p>neutral {neutral}</p>
    <p>all {all}</p>
    <p>average {avg}</p>
    <p>positive {pos} %</p>
  </div>
  )
}

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
  const [all, setAll] = useState(0)
  const [average, setAvg] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGoodClick = () => {
    setGood(good+1)
    setAll(all+1)
    setAvg((good-bad+1)/(all+1))
    setPositive((good+1)/(all+1)*100)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral+1)
    setAll(all+1)
    setAvg((good-bad)/(all+1))
    setPositive((good)/(all+1)*100)
  }

  const handleBadClick = () => {
    setBad(bad+1)
    setAll(all+1)
    setAvg((good-(bad+1))/(all+1))
    setPositive((good)/(all+1)*100)
  }

  return (
    <div>
      <h2>give feedback</h2>
      <Button clickFunction={handleGoodClick} text='good' />
      <Button clickFunction={handleNeutralClick} text='neutral' />
      <Button clickFunction={handleBadClick} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} avg={average} pos={positive} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)

