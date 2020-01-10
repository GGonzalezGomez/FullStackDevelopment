import React from 'react'

const Notification = (props) => {
    if (props.message === null){
	    return null
    }

    if(props.type === 'notification'){
        return (
            <div style={{'color': 'green', 'background': 'lightgrey', 'fontSize': '20px', 'borderStyle': 'solid', 'borderRadius': '5px', 'padding': '10px', 'marginBottom': '10px'}}>
                {props.message}
               </div>
        )
    }
    if(props.type === 'errornotification'){
        return (
            <div style={{'color': 'red', 'background': 'lightgrey', 'fontSize': '20px', 'borderStyle': 'solid', 'borderRadius': '5px', 'padding': '10px', 'marginBottom': '10px'}}>
                {props.message}
               </div>
        )
    }
    if(props.type === 'loginerrornotification'){
        return (
            <div style={{'color': 'red', 'fontSize': '10px', 'padding': '10px', 'marginBottom': '10px'}}>
                {props.message}
               </div>
        )
    }

}

export default Notification