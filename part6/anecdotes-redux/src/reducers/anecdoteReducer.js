import anecdoteService from '../services/anecdotes'

export const voteAnecdote = (content) => {
  return async dispatch => {
    const changedAnecdote = { 
      ...content, 
      votes: content.votes + 1
    }
    const newVote = await anecdoteService.updateObject(changedAnecdote)
    dispatch({
      type: 'VOTE',
      data: newVote
    })
    return true
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      return state.map(anecdote =>
        anecdote.id !== action.data.id ? anecdote : action.data 
      ).sort((a,b) => {
        if(a.votes < b.votes)
          return 1
        if(a.votes > b.votes)
          return -1
        return 0
      })
    case 'NEW_ANECDOTE':
      return state.concat(action.data)
    case 'INIT_ANECDOTES':
      return action.data.sort((a,b) => {
        if(a.votes < b.votes)
          return 1
        if(a.votes > b.votes)
          return -1
        return 0
      })
    default:
      return state
  }
}

export default reducer