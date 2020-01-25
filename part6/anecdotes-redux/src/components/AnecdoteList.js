import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'
import { showNotification,hideNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

    const vote = (id) => {
			props.voteAnecdote(id)
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
              	props.showNotification("you voted '"+anecdote.content+"'")
								vote(anecdote.id)
              	setTimeout( () => {
									props.hideNotification()
              	},5000)}
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
	return anecdotes.filter(anecdote => anecdote.content.includes(filter))
}

export default connect(mapStateToProps,mapDispatchToProps)(AnecdoteList)