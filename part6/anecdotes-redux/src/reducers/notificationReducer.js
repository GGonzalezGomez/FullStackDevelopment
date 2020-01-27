  export const showNotification = (content,period) => {
    return async dispatch => {
      dispatch({
        type: 'SHOW_MESSAGE',
        data: {
          message: content,
          period: period
        }
      })
      setTimeout( () => {
        dispatch({
          type: 'HIDE_MESSAGE',
          data: {
            message: null
          }
        })
      },period*1000)
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