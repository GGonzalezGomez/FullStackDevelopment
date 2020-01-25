import React from 'react';
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'

/*<Notification />
      <Filter />
      <AnecdoteForm />
*/
const App = (props) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList />
    </div>
  )
}

export default App