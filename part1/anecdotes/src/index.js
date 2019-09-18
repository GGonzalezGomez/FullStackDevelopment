import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({})

//Array(len).fill(0);
  
  const handleNextButton = () => {
	  setSelected(Math.floor(Math.random()*props.anecdotes.length))
  }
  
  const handleVoteButton = () => {
	  const copy = { ...votes }
	  if(votes[selected]=== undefined)
		  copy[selected] = 1
	  else
		  copy[selected] += 1
	  setVotes(copy)
  }
 
  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{props.anecdotes[selected]}</p>
      <Printvotes votes={votes} selected={selected} />
      <Button text="vote" clickFunction={handleVoteButton} />
      <Button text="next anecdote" clickFunction={handleNextButton} />
      <Displaymaxvotes votes={votes} anecdotes={props.anecdotes} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Button = ({clickFunction, text}) => (
	<button onClick={clickFunction}>
	  {text}
	</button>
)

const Printvotes = ({votes,selected}) => {
	var v
	if(votes[selected] === undefined)
		v=0
	else
		v=votes[selected]
	return(
		<p>has {v} votes</p>
	)
}

const Displaymaxvotes = ({votes,anecdotes}) => {
	var maxValue=0
	var maxAnecdote

	for (const an in votes) {
		if(votes[an]>maxValue && votes[an]!== undefined){
			maxAnecdote=anecdotes[an]
			maxValue=votes[an]
		}
	}
	if(maxValue>0){
		return (
			<div>
				<h2>Anecdote with most votes</h2>
				<p>{maxAnecdote}</p>
			</div>
		)
	}
	return null
}

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
