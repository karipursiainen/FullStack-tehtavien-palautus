import React, { useState } from 'react'
import { gql, useLazyQuery } from '@apollo/client'
import { FIND_AUTHOR } from '../queries'

import SetBirthyear from './SetBirthyear'

const Notify = ({errorMessage}) => {
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>
  )
}

const Authors = (props) => {
  const [getAuthor, result] = useLazyQuery(FIND_AUTHOR) 
  const [author, setAuthor] = useState(null)

  const [errorMessage, setErrorMessage] = useState(null)

  const [page, setPage] = useState('update')
/*
  useEffect(() => {
    if (props.authors.data) {
      setAuthor(props.authors.data.findAuthor)
    }
  }, [result])
*/
  if (!props.show) {
    return null
  }
  //const authors = []
/*
  const showAuthor = (name) => {
    getAuthor({ variables: { nameToSearch: name } })
  }
*/
  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {props.authors.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
           
            </tr>
          )}
        </tbody>
      </table>
      
      <Notify errorMessage={errorMessage} />
      <SetBirthyear
        show={page === 'update'}
        setError={notify}
        authors={props.authors}
      />

    </div>
  )
}

//

export default Authors