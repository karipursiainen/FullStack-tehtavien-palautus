const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const nimi = process.argv[3]
const numero = process.argv[4]

const url =
  `mongodb+srv://Kari-FullStack:Sepanmaki17743@cluster0.xvvgp.mongodb.net/person-app?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length===3) {
    console.log('phonebook:')
    Person.find({}).then(result => {
        result.forEach(person => {
          console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
}

else {
    
    const person = new Person({
        name: nimi,
        number: numero,
    })

    person.save().then(response => {
    console.log('added', nimi, 'number', numero, 'to phonebook')
    mongoose.connection.close()
    })
}
