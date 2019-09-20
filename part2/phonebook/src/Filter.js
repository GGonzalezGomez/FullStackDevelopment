import React from 'react'

const Filter = (props) => {
    return (
	<div>
           filter shown with: <input value={props.filtervalue} onChange={props.changeFunction} />
        </div>
    )
}

export default Filter
