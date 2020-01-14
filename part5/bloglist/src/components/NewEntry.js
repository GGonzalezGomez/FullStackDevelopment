import React from 'react'

const NewEntry = ({handleCreateNewEntry, newTitle, newAuthor, newUrl}) => {    
    return (
        <div>
            <h2>Create new</h2>
            <form onSubmit={handleCreateNewEntry}>
                <p><b>title:</b> <input value={newTitle.value} onChange={newTitle.onChange} /></p>
                <p><b>author:</b> <input value={newAuthor.value} onChange={newAuthor.onChange} /></p>
                <p><b>url:</b> <input value={newUrl.value} onChange={newUrl.onChange} /></p>
                <p><button type="submit">Create</button></p>
            </form>
        </div>
    )
}

export default NewEntry