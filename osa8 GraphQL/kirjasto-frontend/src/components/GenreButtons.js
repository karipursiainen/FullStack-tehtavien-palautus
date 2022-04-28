import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'

import { ALL_BOOKS } from '../queries'
import Books from './Books'

const GenreButtons = (props) => {
    const [page, setPage] = useState('')
    const [genre, setGenre] = useState('')
    /*
    const [name, setName] = useState('')
    const [bornStr, setBornStr] = useState('')
    const [state, setState] = useState('')
  
    const [ updateAuthor, result ] = useMutation(EDIT_BIRTHYEAR)
    */

  /*
    useEffect(() => {
      if (result.data && result.data.editBirthyear === null) {
        props.setError('person not found')
      }
    }, [result.data])
*/
/*
    if (!props.show) {
      return null
    }
*/
 /*
    const submit = async (event) => {
        event.preventDefault()
     
       
        born = parseInt(bornStr)
        updateAuthor({ variables: { name, born } })
    
        setName('')
        setBornStr('')
     

    } // submit
       */

  return (
    <div>
      
      

        <div>
            {props.uniqueGenres.map(a => 
                <button value={a} 
                        onClick={({ target }) => {setGenre(target.value); setPage('books')}}
                        >{a}
                </button>
                
            )}
            <button value="all"
                    onClick={({ target }) => {setGenre(target.value); setPage('books')}}>all genres</button>
            <Books
                show={page === 'books'}
                books = {props.books}
                genre = {genre}
            />

            
        </div>


        
      
    </div>
  )

}

export default GenreButtons

