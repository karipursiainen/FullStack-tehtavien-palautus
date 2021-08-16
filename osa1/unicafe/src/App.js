import React, { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

// Tilastot
const Statistics = (props) => {
  
  if (props.parts[3].part === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return (
    <div>
      <tr>
        <td><StatisticLine value={props.parts[0].text} /></td>
        <td><StatisticLine value={props.parts[0].part} /></td>
      </tr>
      <tr>
        <td><StatisticLine value={props.parts[1].text} /></td>
        <td><StatisticLine value={props.parts[1].part} /></td>
      </tr>
      <tr>
        <td><StatisticLine value={props.parts[2].text} /></td>
        <td><StatisticLine value={props.parts[2].part} /></td>
      </tr>
      <tr>
        <td><StatisticLine value={props.parts[3].text} /></td>
        <td><StatisticLine value={props.parts[3].part} /></td>
      </tr>
      <tr>
        <td><StatisticLine value={props.parts[4].text} /></td>
        <td><StatisticLine value={props.parts[4].part} /></td>
      </tr>
      <tr>
        <td><StatisticLine value={props.parts[5].text} /></td>
        <td><StatisticLine value={props.parts[5].part} /></td>%
      </tr>
      
    </div>
  )
}

const StatisticLine = (props) => {
  return (
    <div>
              <p>{props.value} </p>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  // good +1, neutral +0, bad -1
  const [goodNeutralBad, setgoodNeutralBad] = useState(0)
  const [averige, setAverige] = useState(0)

  // Lisätään good -arvoa yhdellä
  // Lisätään goodNeutralBad -arvoa yhdellä
  const handleGoodClick = () => {
    setGood(good + 1)
    setAll(all + 1)
    console.log(goodNeutralBad)
    setgoodNeutralBad(goodNeutralBad + 1)
    console.log(goodNeutralBad)
    console.log(all)
    console.log(good)
    
    
    if (all === 0) {
      console.log(8888) 
      setAverige(1)
    }
    else {
      console.log(9999)
      setAverige(goodNeutralBad / all)
    }
    
  }
  console.log(good,neutral,bad,all,goodNeutralBad,averige)
  // Lisätään neutral -arvoa yhdellä
  // Lisätään goodNeutralBad -arvoa nollalla
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
    setgoodNeutralBad(goodNeutralBad + 0)
    setAverige(goodNeutralBad / all)
  }

  // Lisätään bad -arvoa yhdellä
  // Vähennetään goodNeutralBad -arvoa yhdellä
  const handleBadClick = () => {
    setBad(bad + 1)
    setAll(all + 1)
    setgoodNeutralBad(goodNeutralBad - 1)
    setAverige(goodNeutralBad / all)
  }

  const stats = {
    parts: [
      {
        part: good,
        text: 'good'
      },
      {
        part: neutral,
        text: 'neutral'
       },
      {
        part: bad,
        text: 'bad'
      },
      {
        part: all,
        text: 'all'
      },
      {
        part: goodNeutralBad / all,
        text: 'average'
      },
      {
        part: (good /all) * 100,
        text: 'positive'
      }
    ]
  }

  return (
    <div>
      <h1><p>give feedback</p></h1>
      <div>
        
        <Button handleClick={handleGoodClick} text='good' />
        <Button handleClick={handleNeutralClick} text='neutral' />
        <Button handleClick={handleBadClick} text='bad' />

        <h1><p>statistic</p></h1>
        <Statistics parts={stats.parts}/>

      </div>
    </div>
  )
}

export default App


/*
        <StatisticLine text={props.parts[0].text} value={props.parts[0].part} />
        <StatisticLine text={props.parts[1].text} value={props.parts[1].part} />
        <StatisticLine text={props.parts[2].text} value={props.parts[2].part} />
        <StatisticLine text={props.parts[3].text} value={props.parts[3].part} />
        <StatisticLine text={props.parts[4].text} value={props.parts[4].part} />
        <StatisticLine text={props.parts[5].text} value={props.parts[5].part} />
*/