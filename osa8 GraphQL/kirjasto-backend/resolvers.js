const { UserInputError, AuthenticationError } = require('apollo-server')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const jwt = require('jsonwebtoken')
const JWT_SECRET = 'mskuttdjif876jdhgg9805803jjgldkjuiyekhjkdljfljfslkj'

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
let books = []
const resolvers = {
    // Teht. 8.3
    Author: {
      bookCount: (root) => {
        
        let bookcountauthor = books.map(books => books.author === root.name)
        //alert(bookcountauthor)
        let lkm = 0
        for (let i = 0; i < bookcountauthor.length; i++) {
          if (bookcountauthor[i]) {
            lkm++
          }
        }
      
        return lkm
      }
    },
    Query: {
      // Teht. 8.1
      //bookCount: () => books.length, 
      //authorCount: () => authors.length,
      // Teht. 8.2
      //allBooks: () => books,
  
      // Teht 8.13
      bookCount: async () => Book.collection.countDocuments(),
      authorCount: async () => Author.collection.countDocuments(),
      //allBooks: async () => Book.find({}) ,
      allAuthors: async () => Author.find({}) ,
  
      // 8.19
      allBooks: async (root, args) => {
        if (!args.genre) {
          //return persons
          return Book.find({})
        }
        return Book.find({ genres: { $in: args.genre } })
      },
      /*
      allBooks: async (root, args) => books.filter(p =>{
        if (args.genre) {
          if(p.genres.length > 0) {
            
            for (let k = 0; k < p.genres.length; k++) {
                if (args.genre === p.genres[k]) {
                    return (p)
                }
                //return null
            } // for k
  
          }
          return null
        }
  
        return p
        
      }),
      */
      // Teht 8.16
      me: (root, args, context) => {
        return context.currentUser
      },
  
      // Teht 8.4
      //allBooks: (root, args) => books.filter(p => p.author === args.author ? p : null),
  
      //Teht 8.5
      /*
      allBooks: (root, args) => books.filter(p =>{
          // sekä author että genre
          if (args.author && args.genre) {
              for (let k = 0; k < args.genre.length; k++) {
                  if (p.genres[k] === args.genre && p.author === args.author) {
                      return p
                  } //if
              } // for 
              
          } // if
          else if (args.author) {
                  if(p.author === args.author) {
                      return p
                  } // if
          } // elseif
          //genre
          else if (args.genre) {
                  for (let k = 0; k < args.genre.length; k++) {
                      if (p.genres[k] === args.genre) {
                          return p
                      }
                  } // for k
              
          }
          else {
              return books
          }
      }),
      */
  
      // Teht 8.3
      //allAuthors: () => authors
    },
  
    Mutation: {
      // Teht 8.6
      /*
      addBook: (root, args) => {
        const book = { ...args, id: uuid() }
        books = books.concat(book)
        return book
      },
      */
      // Teht. 8.7
      /*
      editAuthor: (root, args) => {
          const author = authors.find(p => p.name === args.name)
          if (!author) {
            return null
          }
      
          const updatedAuthor = { ...author, born: args.setBornTo }
          authors = authors.map(p => p.name === args.name ? updatedAuthor : p)
          return updatedAuthor
      },
      */
  
      // Teht. 8.14
      
      addBook: async (root, args, context) => {
        
        const currentUser = context.currentUser
  
        if (!currentUser) {
          throw new AuthenticationError('not authenticated')
        }
  
        const book = new Book({ ...args })
        const author = new Author({name: args.author })
        try {
          await book.save()
  
          const newauthor = authors.find(p => p.name === args.author)
          if (!newauthor) {
            await author.save()
          }
  
        } catch (error) {
          /*
          throw new UserInputError(error.message, {
            invalidArgs: args,
           
          }) */
        }

        pubsub.publish('BOOK_ADDED', { bookAdded: book })
  
        return book
  
      },
      
      // Teht. 8.14
      
      editAuthor: async (root, args, context) => {
        
        const currentUser = context.currentUser
        
        if (!currentUser) {
          throw new AuthenticationError('not authenticated')
        }
        
        const author = await Author.findOne({ name: args.name })
        author.born = args.setBornTo
  
        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        return author.save()
  
      },
      
     
      // Teht 8.16
      createUser: async (root, args) => {
        const user = new User({ username: args.username })
  
        return user.save().catch((error) => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
      },
      login: async (root, args) => {
        const user = await User.findOne({ username: args.username })
  
        if (!user || args.password !== 'secret') {
          throw new UserInputError('wrong credentials')
        }
  
        const userForToken = {
          username: user.username,
          id: user._id,
        }
  
        return { value: jwt.sign(userForToken, JWT_SECRET) }
      },
      
    },

    Subscription: {
        bookAdded: {
          subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
        },
      },
  
  }

  module.exports = resolvers