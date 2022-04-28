import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'

import { EDIT_BIRTHYEAR, ALL_AUTHORS } from '../queries'

const SetBirthyear = (props) => {

  const [name, setName] = useState('')
  const [bornStr, setBornStr] = useState('')

  const [ updateAuthor, result ] = useMutation(EDIT_BIRTHYEAR)


  useEffect(() => {
    if (result.data && result.data.editBirthyear === null) {
      props.setError('person not found')
    }
  }, [result.data])

  if (!props.show) {
    return null
  }

  let born = 0

  const submit = async (event) => {
    event.preventDefault()
//console.log (born)

    born = parseInt(bornStr)
//console.log (typeof bornStr, typeof born)
    updateAuthor({ variables: { name, born } })

    setName('')
    setBornStr('')
  }


  


  return (
    <div>
      <h2>Set birthyear</h2>

      <form onSubmit={submit}>
        <div>
          name <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born <input
            value={bornStr}
            onChange={({ target }) => setBornStr(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default SetBirthyear