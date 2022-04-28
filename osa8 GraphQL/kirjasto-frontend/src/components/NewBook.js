import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_BOOK, ALL_BOOKS } from '../queries'
import { updateCache } from '../App'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  //const [published, setPublished] = useState(0)
  let published = 0
  const [publishedStr, setPublishedStr] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [ createBook ] = useMutation(CREATE_BOOK, {
    refetchQueries: [  { query: ALL_BOOKS } ],
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
      props.setError(error.graphQLErrors[0].message)
    },
    update: (cache, response) => {
      updateCache(cache, { query: ALL_BOOKS }, response.data.addBook)
    },
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    
    //console.log('add book...', publishedStr)
    //setPublished(parseInt(publishedStr))
    published = parseInt(publishedStr)
    //console.log('add book...1', published)
    createBook({  variables: { title, author, published, genres } })
    //console.log('add book...2')
    setTitle('')
    setPublishedStr('')
    //setPublished(0)
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }
  console.log('add book...3', genres)
  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            
            value={publishedStr}
            onChange={({ target }) => setPublishedStr(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

// type='number'
export default NewBook