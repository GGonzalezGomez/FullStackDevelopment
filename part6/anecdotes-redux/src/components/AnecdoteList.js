import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'
import { showNotification,hideNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

    const vote = (anecdote) => {
		props.voteAnecdote(anecdote)
    }

    return (
      <div>
        {props.anecdotesToShow.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
          	<div>
            	has {anecdote.votes} <button onClick={() => {
              	props.showNotification("you voted '"+anecdote.content+"'",1)
				vote(anecdote)}
            	}>vote</button>
          	</div>
        	</div>
      	)}
      </div>
    )
}

const mapStateToProps = (state) => {
	return {
		anecdotesToShow: filterAnecdotes(state)
	}
}

const mapDispatchToProps = {
	voteAnecdote,
	showNotification,
	hideNotification
}

const filterAnecdotes = ({filter, anecdotes}) => {
	return anecdotes.filter(anecdote => {
		return anecdote.content.includes(filter)
	})
}

export default connect(mapStateToProps,mapDispatchToProps)(AnecdoteList)