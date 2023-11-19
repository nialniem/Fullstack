const express = require('express')
const app = express()
app.use(express.json())

let persons = [
    {
      id: 1,
      name: "Arto Hellas",
      Number: "040074621788"
    },
    {
        id: 2,
        name: "Jokke Spanieli",
        Number: "0506466326"
    },
    {
        id: 3,
        name: "Ismo Laitela",
        Number: "+35840053528"
    },
    {
        id: 4,
        name: "Sepi Kovanen",
        Number: "+35850048832"
    }
  ]
 
  app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })
  
  app.get('/info', (req, res) => {
  
    let info = `<p>Phonebook has info for ${persons.length} people</p>`
    info += new Date()
    res.send(info)
})
  
  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    response.json(person)
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

  const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 1
  }
  
  app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.name || !body.Number) {
      return response.status(400).json({ 
        error: 'Name and Number missing!' 
      })
    }
    
    
    
    if (onko = true) {
        return response.status(400).json({ 
          error: 'Name must be unique!' 
        })
      }
  
    const person = {
      id: generateId(),
      name: body.name,
      Number: body.Number
    }
  
    persons = persons.concat(person)
  
    response.json(person)
  })
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })