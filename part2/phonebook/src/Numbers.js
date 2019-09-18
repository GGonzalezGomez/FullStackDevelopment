import React from 'react'

const Person = ({p}) => {
	return(
		<p>{p.name} {p.number}</p>
	)
}

const Printpersons = ({persons}) => persons.map(p => <Person p={p} key={p.name} />)

const Numbers = ({persons}) => {

  return (
    <div>
      <h2>Numbers</h2>
      <Printpersons persons={persons} />
    </div>
  )
}

export default Numbers

