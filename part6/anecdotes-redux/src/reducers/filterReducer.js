export const updateFilter = (content) => {
    return {
      type: 'UPDATE_FILTER',
      data: {
        filter: content
      }
    }
  }

export const resetFilter = (content) => {
    return {
      type: 'RESET_FILTER',
      data: {
        filter: ""
      }
    }
  }

  const reducer = (state = "", action) => {
    switch (action.type) {
        case 'UPDATE_FILTER':
            return action.data.filter
        case 'RESET_FILTER':
            return action.data.filter
        default:
            return state
    }
  }
  
  export default reducer