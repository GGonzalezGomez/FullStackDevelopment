export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: {id}
  }
}

export const createAnecdote = (content) => {
  console.log('c: '+ content)
  return {
    type: 'NEW_ANECDOTE',
    data: {
      content
    }
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = { 
        ...anecdoteToChange, 
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote 
      ).sort((a,b) => {
        if(a.votes < b.votes)
          return 1
        if(a.votes > b.votes)
          return -1
        return 0
      })
    case 'NEW_ANECDOTE':
      return state.concat(action.data.content)
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export default reducer