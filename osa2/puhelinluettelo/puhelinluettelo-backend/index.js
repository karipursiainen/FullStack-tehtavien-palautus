const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

const morgan = require('morgan')


  morgan.token("nameNumber", function getNameNumber(req) {
    if (req.method === "POST") {
        return (JSON.stringify({name: req.body.name, number: req.body.number}));
    } else return ' '
   }); 
  
  app.use(morgan(':method :url :status :res[content-length] - :response-time ms :nameNumber'))
  
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)


let persons = [
  {
      id: 1,
      name: "Arto Hellas",
      number: "040-123456"
    },
    {
      id: 2,
      name: "Ada Lovelace",
      number: "39-44-5323523"
    },
    {
      id: 3,
      name: "Dan Abramov",
      number: "12-43-234345"
    },
    {
      id: 4,
      name: "Mary Poppendick",
      number: "39-23-6423122"
    },
    {
      id: 5,
      name: "Kari Pursiainen",
      number: "040987456"
    }
]
  
app.get('/', (req, res) => {
  res.send('<h1>Hello puhelinluettelo-backend!</h1>')
})

// Näytetään kaikki tiedot
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

const DATE = Date()
const numOfPeople = persons.length
app.get('/info', (request, response) => {
  response.send(`<p>Phonebook has info for ${numOfPeople} people</p> ${DATE}`)
})

// Näytetään 1 tieto
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
  .then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }

  })
  .catch(error => next(error))
})
// Arvotaan id
const generateRandomId = () => {
  return (Math.round(Math.random() * 1000) + 1)
}

// Lisäys
app.post('/api/persons', (request, response) => {
  const apugenerateRandomId = generateRandomId()
  const body = request.body
  const personId = persons.find(person => person.id === apugenerateRandomId)
  const personName = persons.find(person => person.name === body.name)
  
  //console.log(personId)
  // id on jo
  if (personId) {
      return response.status(400).json({ 
          error: 'id must be unique' 
      })
  }
  // Nimi on jo
  else if (personName) {
      return response.status(400).json({ 
          error: 'name must be unique' 
      })
  }
  
  // Nimi puuttuu
  if (!body.name) {
      return response.status(400).json({ 
        error: 'name missing' 
      })
    }
  // Numero puuttuu
  else if (!body.number) {
  return response.status(400).json({ 
      error: 'number missing' 
  })
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  })

  persons = persons.concat(person)

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })

})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson=> {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


// tämä tulee kaikkien muiden middlewarejen rekisteröinnin jälkeen!
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
