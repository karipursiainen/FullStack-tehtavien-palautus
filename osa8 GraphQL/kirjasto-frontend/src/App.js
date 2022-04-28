import React, { useState } from 'react'
import { useQuery, useSubscription, useApolloClient } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import RecommendGenre from './components/RecommendGenre'

import { ALL_AUTHORS } from './queries'
import { ALL_BOOKS } from './queries'
import { BOOK_ADDED } from './queries'
//import SetBirthyear from './components/SetBirthyear'

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

// function that takes care of manipulating cache
export const updateCache = (cache, query, addedBook) => {
  const uniqByTitle = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.name
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByTitle(allBooks.concat(addedBook)),
    }
  })
}

const App = () => {
  const [token, setToken] = useState(null)
  const result = useQuery(ALL_AUTHORS, {
    pollInterval: 2000})
  const result2 = useQuery(ALL_BOOKS, {
    pollInterval: 2000})

  const client = useApolloClient()

  const [errorMessage, setErrorMessage] = useState(null)

  const [page, setPage] = useState('')
//console.log(result.data)

useSubscription(BOOK_ADDED, {
  onSubscriptionData: ({ subscriptionData, client }) => {
    console.log(subscriptionData)
    const addedBook = subscriptionData.data.bookAdded
    notify(`${addedBook.title} added`)
    updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
    /*
    client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
      return {
        allBooks: allBooks.concat(addedBook),
      }
    })
    */

    /*
      const uniqByTitle = (a) => {
        let seen = new Set()
        return a.filter((item) => {
          let k = item.title
          return seen.has(k) ? false : seen.add(k)
        })
      }
      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: uniqByTitle(allBooks.concat(addedBook)),
        }
      })
    */
  }
})

const logout = () => {
  setToken(null)
  localStorage.clear()
  client.resetStore()
}

if (result.loading)  {
  return <div>loading...</div>
}


const notify = (message) => {
  setErrorMessage(message)
  setTimeout(() => {
    setErrorMessage(null)
  }, 10000)
}

if (!token) {
  return (
    <>
      <Notify errorMessage={errorMessage} />
      <LoginForm setToken={setToken} setError={notify} />
    </>
  )
}

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommend')}>recommend</button>
        
      </div>

      <Notify errorMessage={errorMessage} />
      <button onClick={logout}>logout</button>
      <Authors
        show={page === 'authors'}
        authors = {result}
      />

      <Books
        show={page === 'books'}
        books = {result2}
      />

      <NewBook
        show={page === 'add'}
        setError={notify}
      />

      <RecommendGenre
        show={page === 'recommend'}
        setError={notify}
        books = {result2}
        genre = 'database'
      />

    </div>
  )
}

export default App