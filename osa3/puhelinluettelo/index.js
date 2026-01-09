const express = require('express')
const app = express()
const path = require('path')

app.use(express.json())
const cors = require('cors')

const morgan = require('morgan')

//utils
morgan.token('body', (request) => JSON.stringify(request.body))

///middlewares
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))



let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "040-123456"
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "39-23-6423122"
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "12-43-234345"
  }
]


app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    
    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
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
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

  app.get('/api/info', (req, res) => {
    const count = persons.length
    const date = new Date()
  
    res.send(`
      <p>Phonebook has info for ${count} people</p>
      <p>${date}</p>
    `)
  })

  const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => Number(n.id)))
      : 0
    return String(maxId + 1)
  }
  
  app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.name || !body.number) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
    const nameExists = persons.some(person => person.name === body.name)

    if (nameExists) {
        return response.status(400).json({
        error: 'name must be unique'
    })
    }
  
    const person = {
      id: generateId(),
      name: body.name,
      number: body.number || false,
      
    }
  
    persons = persons.concat(person)
  
    response.json(person)
  })

  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })