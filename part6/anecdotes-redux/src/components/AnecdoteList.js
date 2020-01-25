import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'
import { showNotification,hideNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    var anecdotes = props.anecdotes
    //anecdotes = anecdotes.filter(anecdote => anecdote.content.includes(props.filter))

    const vote = (id) => {
			//props.store.dispatch(voteAnecdote(id))
			console.log('vote '+id)
    }

    return (
      <div>
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
          	<div>
            	has {anecdote.votes} <button onClick={() => {
              	//props.store.dispatch(showNotification("you voted '"+anecdote.content+"'"))
								//vote(anecdote.id)
								console.log('clicked')
              	setTimeout( () => {
									//props.store.dispatch(hideNotification())
									console.log('clicked off')
              	},5000)}
            	}>vote</button>
          	</div>
        	</div>
      	)}
      </div>
    )
}

const mapStateToProps = (state) => {
	console.log(state)
	return {
		anecdotes: state.anecdotes,
		filter: state.filter,
		notification: state.notification
	}
}

const filterAnecdotes = ({filter, notification, anecdotes}) => {
	return {
		anecdotes: anecdotes.filter(anecdote => anecdote.content.includes(filter)),
		notification
	}
}

export default connect(mapStateToProps,null)(AnecdoteList)