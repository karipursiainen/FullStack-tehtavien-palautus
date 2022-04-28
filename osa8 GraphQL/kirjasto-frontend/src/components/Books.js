import React, { useState, useEffect } from 'react'
import { gql, useLazyQuery } from '@apollo/client'
import { FIND_BOOK } from '../queries'

import GenreButtons from './GenreButtons'

const Notify = ({errorMessage}) => {
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
      {errorMessage}ooks
    </div>
  )
}

const Books = (props) => {
  const [getBook, result2] = useLazyQuery(FIND_BOOK) 
  const [book, setBook] = useState(null)

  const [errorMessage, setErrorMessage] = useState(null)

  const [genre, setGenre] = useState('')

  useEffect(() => {
    if (props.books.data) {
      setBook(props.books.data.findBook)
    }
    }, [result2])

  if (!props.show) {
    return null
  }
  /*
  const books = []
*/

const showBook = (title) => {
  getBook({ variables: { titleToSearch: title } })
}

const notify = (message) => {
  setErrorMessage(message)
  setTimeout(() => {
    setErrorMessage(null)
  }, 10000)
}

// Etsitään genret
let buttonArray = []
let newArr = []
const genreButtons = props.books.data.allBooks.map(a => a.genres.length > 0 ?
  buttonArray.push(a.genres) : null
)
console.log (buttonArray)
// kerättään genret taulukkoon
for (let i = 0; i < buttonArray.length; i++) {
  for (let k = 0; k < buttonArray[i].length; k++) {
    newArr.push(buttonArray[i][k])
  }
}
console.log('newArr', newArr)
// poistetaan duplikaatit ja sortataan
let uniqueGenres = [...new Set(newArr)].sort()
console.log('uniqueGenres', uniqueGenres)


  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {props.books.data.allBooks.map(a => {

            // 8.19
            if (props.genre === 'all') {
              return (
                <tr key={a.title}>
                        <td>{a.title}</td>
                        <td>{a.author}</td>
                        <td>{a.published}</td>
                </tr>
              )
            }

            if (props.genre) {
              for (let i=0; i<a.genres.length; i++) {
                if (a.genres[i] === props.genre)
                  return (
                  <tr key={a.title}>
                    <td>{a.title}</td>
                    <td>{a.author}</td>
                    <td>{a.published}</td>
                  </tr>)
                
              }
              return null
            }
            return (
            <tr key={a.title}>
                    <td>{a.title}</td>
                    <td>{a.author}</td>
                    <td>{a.published}</td>
            </tr>
            )
          }
          )}
        </tbody>
      </table>

      <GenreButtons
        setError={notify}
        books={props.books}
        uniqueGenres={uniqueGenres}
      />

    </div>
  )
}

export default Books