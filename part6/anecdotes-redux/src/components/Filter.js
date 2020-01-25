import React from 'react'
import { updateFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {
  const handleChange = (event) => {
    props.updateFilter(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapStateToProps = (state) => {
	return {
		filter: state.filter
	}
}

const mapDispatchToProps = {
	updateFilter
}

export default connect(mapStateToProps,mapDispatchToProps)(Filter)