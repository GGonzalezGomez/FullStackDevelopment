import React from 'react'

const NewEntry = ({handleCreateNewEntry, newTitle, changeNewTitle, newAuthor, changeNewAuthor, newUrl, changeNewUrl}) => {
    
    return (
        <div>
            <h2>Create new</h2>
            <form onSubmit={handleCreateNewEntry}>
                <p><b>title:</b> <input value={newTitle} onChange={changeNewTitle} /></p>
                <p><b>author:</b> <input value={newAuthor} onChange={changeNewAuthor} /></p>
                <p><b>url:</b> <input value={newUrl} onChange={changeNewUrl} /></p>
                <p><button type="submit">Create</button></p>
            </form>
        </div>
    )
}

export default NewEntry