const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')

app.use(express.json())
const cors = require('cors')

const morgan = require('morgan')


require('dotenv').config()

const url = process.env.MONGODB_URI


mongoose.set('strictQuery', false)

mongoose.connect(url, { family: 4 })
  .then(() => console.log('connected to MongoDB'))
  .catch((error) => {
    console.error('error connecting to MongoDB:', error.message)
    process.exit(1)
  })



const personSchema = new mongoose.Schema({
  name:{
    type:String,
    minlength: 3,
    required: [true, 'name must be at least 3 characters long']


  } ,
  number: {
    type: String,
    minlength: 8,
    validate: {
      validator: function(v) {
        return /^\d{2,3}-\d{5,}$/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'number is required']
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Person = mongoose.model('Person', personSchema)
//utils
morgan.token('body', (request) => JSON.stringify(request.body))

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformatted id' })
  }

  if (error.name === 'ValidationError') {
    const messages = Object.values(error.errors).map(e => e.message)
    return response.status(400).json({ error: messages[0] }) // esim "name must be at least 3 characters long"
  }

  next(error)
}

///middlewares
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))




app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

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

  app.get('/', (req, res) => {
    res.send(`
      <h1>Phonebook backend</h1>
      <ul>
        <li><a href="/api/persons">/api/persons</a></li>
        <li><a href="/api/info">/api/info</a></li>
      </ul>
    `)
  })
  
      
    app.use(express.static(path.join(__dirname, 'dist')))

    
    app.get(/^(?!\/api).*/, (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'))
    })
    

    app.delete('/api/persons/:id', (request, response) => {
      Person.findByIdAndDelete(request.params.id)
        .then(result => {
          response.status(204).end()
        })
        .catch(error => {
          response.status(400).json({ error: 'malformatted id' })
        })
    })
    

  app.get('/api/info', (req, res) => {
    Person.countDocuments({})
      .then(count => {
        res.send(`
          <p>Phonebook has info for ${count} people</p>
          <p>${new Date()}</p>
        `)
      })
  })
  

 
  
  app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.name || !body.number) {
      return response.status(400).json({ error: 'content missing' })
    }
  
    const person = new Person({
      name: body.name,
      number: body.number
    })
  
    person.save()
      .then(savedPerson => {
        response.json(savedPerson)
      })
      .catch(error => {
        response.status(400).json({ error: error.message })
      })
  })

  app.put('/api/persons/:id', (request, response, next) => {
    const { name, number } = request.body
  
    Person.findById(request.params.id)
      .then(person => {
        if (!person) {
          return response.status(404).end()
        }
  
        person.name = name
        person.number = number
  
        return person.save().then((updatedPerson) => {
          response.json(updatedPerson)
        })
      })
      .catch(error => next(error))
  })
  
  app.use(errorHandler)

  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })