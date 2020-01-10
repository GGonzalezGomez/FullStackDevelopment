import React from 'react'

const NewEntry = (props) => {
    
    return (
        <div>
            <h2>Create new</h2>
            <form onSubmit={props.handleCreateNewEntry}>
                <p><b>title:</b> <input value={props.newTitle} onChange={props.changeNewTitle} /></p>
                <p><b>author:</b> <input value={props.newAuthor} onChange={props.changeNewAuthor} /></p>
                <p><b>url:</b> <input value={props.newUrl} onChange={props.changeNewUrl} /></p>
                <p><button type="submit">Create</button></p>
            </form>
        </div>
    )
}

export default NewEntry