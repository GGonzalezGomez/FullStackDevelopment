  export const createAnecdote = (content) => {
    return {
      type: 'NEW_ANECDOTE',
      data: {
        content
      }
    }
  }
  
  const reducer = (state = null, action) => {
    switch (action.type) {
      case 'SHOW_MESSAGE':
        return state
      case 'HIDE_MESSAGE':
        return state
      default:
        return state
    }
  }
  
  export default reducer