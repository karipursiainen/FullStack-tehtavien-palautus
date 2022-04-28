const { gql } = require('apollo-server')

const typeDefs = gql`
    type User {
      username: String!
      friends: [Author!]!
      favoriteGenre: String!
      id: ID!
    }

    type Token {
      value: String!
    }

    type Book {
        title: String!
        published: Int!
        author: String!
        genres: [String]
        id: ID!
    }

    type Author {
        name: String!
        id: ID!
        born: Int
        bookCount: Int
    }

    type Query {
        bookCount: Int
        authorCount: Int
        allBooks (genre: String): [Book]
        
        allAuthors: [Author]
        me: User
    }

    type Mutation {
        addBook(
          title: String!
          author: String!
          published: Int!
          genres: [String]
        ): Book
        editAuthor(
          name: String!
          setBornTo: Int!
        ): Author
        createUser(
          username: String!
          favoriteGenre: String!
        ): User
        login(
          username: String!
          password: String!
        ): Token
      
    }

    type Subscription {
        bookAdded: Book!
      }   
    
`

module.exports = typeDefs