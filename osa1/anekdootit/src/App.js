import React, { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
]

const votes = Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0);
const copy = [...votes]
//console.log('copy', copy)

const NaytaAnekdootti = (props) => {
     
  if (props.valittu === null) {
    return (
      <div>
        Paina näppäintä saadaksesi seuraavan anekdootin.
      </div>
    )
  }

  return (
    <div>
      {props.text[props.valittu]}
    </div>
   )
}

const Aanet = (props) => {
  //console.log('propscopy', props.copy[props.valittu])
  if (props.valittu === null) {
    return (
      <div>
        No votes yet
      </div>
    )
  }

  return (
    <div>
      {props.text1} {props.copy[props.valittu]} {props.text2}
    </div>
   )
}

const AnecdoteWithMostVotes = (props) => {
  if (props.valittu === null) {
    return (
      <div>
        No votes yet
      </div>
    )
  }

  return (
    // käy läpi taulukko ja etsi alkio, jolla eniten ääniä
    <div>
      {props.text[copy.indexOf(Math.max(...copy))]}
    </div>
   )
}


const App = () => {
  
  const [selected, setSelected] = useState(null)

  //console.log('selected',selected)

  const handleNextClick = () => {
    // Arvotaan satunnainen anekdootti

    setSelected(Math.floor(Math.random()*anecdotes.length))
     
  }

  const handleVoteClick = () => {
    copy[selected] += 1
    //console.log('handleVoteClick', copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <NaytaAnekdootti text={anecdotes} valittu={selected}/>
      <Aanet value={votes} text1 = 'has' text2 = 'votes' valittu={selected} copy={copy}/>
      <Button handleClick={handleVoteClick} text='vote' />
      <Button handleClick={handleNextClick} text='Next anecdote' />
      <h1>Anecdote with most votes</h1>
      <AnecdoteWithMostVotes text={anecdotes} valittu={selected}/>
    </div>
  )
}

export default App
