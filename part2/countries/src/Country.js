import React, { useEffect }  from 'react'

const Country = (props) => {
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
        			<Printcountries countries={props.countries} handleFunction={props.clickFunction}/>
      			</div>
    		)
	else {
		if(props.countries.length===1)
			return (
				<Singlecountry country={props.countries[0]} hook={props.hook} weather={props.weather} />
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

const Languages = (props) => {
	return(
		<li>{props.lang.name}</li>
	)
}

const Weather = (props) => {
	return (
		<div>
			<h3>Weather in {props.country.capital}</h3>
			<p>temperature: {props.weather.temperature} Celsius </p>
			<img src={props.weather.weather_icons} alt={props.country.capital} />
			<p>wind: {props.weather.wind_speed} kph direction {props.weather.wind_dir}</p>
		</div>
	)
}

const Singlecountry = (props) => {
	useEffect(props.hook,[])
	return(
		<div>
			<h2>{props.country.name}</h2>
			<p>capital {props.country.capital}</p>
			<p>population {props.country.population}</p>
			<h3>languages</h3>
			<ul> {props.country.languages.map(lang => <Languages lang={lang} key={lang.name} />)} </ul>
			<img src={props.country.flag} alt={props.country.name} />
			<Weather country={props.country} weather={props.weather} />
		</div>
	)
}

const Countrydetails = (props) => {
        return(
                <p>{props.p.name} <button id={props.p.name} onClick={props.fun}>show</button></p>
        )
}

const Printcountries = (props) => props.countries.map(p => <Countrydetails p={p} key={p.name} fun={props.handleFunction}/>)

export default Country
