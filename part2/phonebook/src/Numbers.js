import React from 'react'

const Numbers = (props) => {
    return (
      <div>
        <Printpersons persons={props.persons} />
      </div>
    )
}

const Person = ({p}) => {
        return(
                <p>{p.name} {p.number}</p>
        )
}

const Printpersons = ({persons}) => persons.map(p => <Person p={p} key={p.name} />)

export default Numbers
