import React from 'react'

const Country = (props) => {
    console.log(props)
    if(props.countries.length>10){
	    return (
		    <div>
		    	<p>Too many matches, specify another filter</p>
		    </div>
	    )
    }
    else {
	if(props.countries.length>1)
    		return (
      			<div>
        			<Printcountries countries={props.countries} />
      			</div>
    		)
	else {
		if(props.countries.length===1)
			return (
				<div>
					<h2>{props.countries[0].name}</h2>
					<p>capital {props.countries[0].capital}</p>
					<p>population {props.countries[0].population}</p>
					<h3>languages</h3>
					<ul>
					{props.countries[0].languages.map(lang => <SingleCountry lang={lang} key={lang.name} />)}
					</ul>
					<img src={props.countries[0].flag} alt={props.countries[0].name} />
				</div>
			)
		else
			return (
				<div>
					<p>No country matches the filter</p>
				</div>
			)
	}
    }
}

const SingleCountry = (props) => {
	return(
		<li>{props.lang.name}</li>
	)
}

const Countrydetails = ({p}) => {
        return(
                <p>{p.name}</p>
        )
}

const Printcountries = ({countries}) => countries.map(p => <Countrydetails p={p} key={p.name} />)

export default Country
