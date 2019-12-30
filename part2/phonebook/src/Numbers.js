import React from 'react'

const Numbers = (props) => {
    return (
      <div>
        <Printpersons persons={props.persons} dc={props.deleteContact} />
      </div>
    )
}

const Person = ({p,dc}) => {
        return(
                <p>{p.name} {p.number} <button id={p.id} onClick={dc}>delete</button></p>
        )
}

const Printpersons = ({persons,dc}) => persons.map(p => <Person p={p} key={p.name} dc={dc} />)

export default Numbers
