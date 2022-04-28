import { gql } from '@apollo/client'

export const FIND_AUTHOR = gql`
query findAuthorByName($nameToSearch: String!) {
  findAuthor(name: $nameToSearch) {
    name
    born 
    bookCount
  }
}
`

export const FIND_BOOK = gql`
query findBookByTitle($titleToSearch: String!) {
  findBook(title: $titleToSearch) {
    title
    author 
    published
    genres
  }
}
`

export const ALL_AUTHORS = gql`
  query  {
    allAuthors  {
      name
      born
      bookCount      
    }
  }
`
export const ALL_BOOKS = gql`
  query allBooks($genre: String) {
    allBooks (genre: $genre) {
      title
      author 
      published
      genres
    }
  }
`
/*
export const ALL_BOOKS = gql`
query  {
  allBooks  {
    title
    author {
      name
      born
    }
    published
  }
}
`
*/

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String]) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres

    ) {
      title
      author
      published
      genres
    }
  }
`

export const EDIT_BIRTHYEAR = gql`
  mutation editBirthyear($name: String!, $born: Int) {
    editAuthor(
      name: $name, 
      setBornTo: $born
    )  {
      name
      born
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      author 
      published
      genres

    }
  }
  

`
