import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification,hideNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    var anecdotes = props.store.getState().anecdotes
    anecdotes = anecdotes.filter(anecdote => anecdote.content.includes(props.store.getState().filter))

    const vote = (id) => {
      props.store.dispatch(voteAnecdote(id))
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
                            props.store.dispatch(showNotification("you voted '"+anecdote.content+"'"))
                            vote(anecdote.id)
                            setTimeout( () => {
                                props.store.dispatch(hideNotification())
                              },5000)
                        }
                        }>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList