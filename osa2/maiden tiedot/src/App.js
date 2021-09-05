import React, { useState, useEffect } from 'react'
import axios from 'axios'

import './index.css';
import './App.css';

const api_key = process.env.REACT_APP_API_KEY

const NewCountry = (props) => {
  
  // muutetaan maan nimi että haku (input) pieniksi kirjaimiksi ( .toLowerCase() )
  const countriesToShow = props.countries.filter(countries => 
  (countries.name.toLowerCase()).includes(props.newcountry.toLowerCase()) === true)

  console.log(33,countriesToShow.length, props.newcountry.length, countriesToShow)

  // input -kenttä tyhjä
  if (props.newcountry.length === 0) {
    return (
      <div>
        <p>find countries
        <input valuecountry={props.newcountry} 
        onChange={props.onchange} /></p>
      </div>
    ) // return
  } // if
  
  // yli 10 maata
  else if (countriesToShow.length > 10) {
    return (
      <div>
        <p>find countries
        <input valuecountry={props.newcountry} 
        onChange={props.onchange} /></p>

        Too many matches, specify another filter
      </div>
    ) // return
  } // else if
   
  return (
    <div>
      <p>find countries
      <input valuecountry={props.newcountry} 
      onChange={props.onchange} /></p>
      
      
      {countriesToShow.map( countries=>
        <Countries key={props.countries.alpha3Code} countries={countries}
                   onecountry={countriesToShow.length}
                   showCountry={props.showCountry}
                   />
      )}

    </div>
  ) // return
} // NewCountry


const Countries = (props) => {
  console.log('Countries',props.countries.name, props.onecountry)

  // maita 2-10
  if (props.onecountry > 1) {
    
    return (
        <div>
          
            {props.countries.name}
                      
        </div>
    ) // return
  } // if

  console.log('Countries2',props.countries.name, props.showCountry,props.countries.languages.name)
  // vain 1 maa
  if (props.onecountry === 1) {

    return (
      <div>
        <h1>{props.countries.name}</h1>
        <p>capital {props.countries.capital}</p>
        <p>population {props.countries.population}</p>
        <h2>languages</h2>
  
        <Languages languages={props.countries.languages}/>

          <img src={props.countries.flag}/>
          <p>
          </p>
      </div>
    ) // return
  } // vain 1 maa
} // Countries

const Languages = (props) => {
    return (
      <div>
        <ul>
          {props.languages.map( languages=><li>{languages.name}</li>)}
        </ul>
      </div>
    )
  
} // Languages

const App = () => {
  // ../db.json
  const [countries, setCountries] = useState([])

  const [ newCountry, setNewCountry ] = useState('')
  const [ showCountries, setShowCountries ] = useState('')

  const [showCountry, setShowCountry] = useState(0)

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/countries')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
      
  }, []) // useEffect

  const handleNewChange = (event) => {
    console.log('handleNewChange', event.target.value)
    setNewCountry(event.target.value)
    console.log(22,newCountry)
  } // handleNewChange



  return (
    
    <div>
      <form>
        <div>
          <NewCountry countries={countries} onchange={handleNewChange}
            newcountry={newCountry} showCountry={showCountry}/>
        </div>
      </form>

    </div>
  )
} // App

export default App;
