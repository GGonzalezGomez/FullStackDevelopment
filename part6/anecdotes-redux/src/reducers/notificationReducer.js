  export const showNotification = (content) => {
    return {
      type: 'SHOW_MESSAGE',
      data: {
        message: content
      }
    }
  }

  export const hideNotification = (content) => {
    return {
      type: 'HIDE_MESSAGE',
      data: {
          message: null
      }
    }
  }  

  const reducer = (state = "", action) => {
    switch (action.type) {
      case 'SHOW_MESSAGE':
        return action.data.message
      case 'HIDE_MESSAGE':
        return ""
      default:
        return state
    }
  }
  
  export default reducer