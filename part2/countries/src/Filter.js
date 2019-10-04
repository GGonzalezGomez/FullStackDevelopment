import React from 'react'

const Filter = (props) => {
    return (
		<div>
           find countries <input value={props.filtervalue} onChange={props.changeFunction} />
        </div>
    )
}

export default Filter
