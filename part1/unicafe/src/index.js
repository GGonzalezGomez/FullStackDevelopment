import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const handleGoodClick = () => {
	console.log('Good')
}

const handleNeutralClick = () => {
	console.log('Neutral')
}

const handleBadClick = () => {
	console.log('Bad')
}

const Feedback = () =>{
	return(
		<div>
		   <h2>give feedback</h2>
		   <button onClick={handleGoodClick}>good</button>
		   <button onClick={handleNeutralClick}>neutral</button>
		   <button onClick={handleBadClick}>bad</button>
		</div>
	)
}

const Stats = () =>{
	return(
		<div>
		   <h2>statistics</h2>
		   <p>good</p>
		   <p>neutral</p>
		   <p>bad</p>
		</div>
	)
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
	  <Feedback/>
	  <Stats/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
