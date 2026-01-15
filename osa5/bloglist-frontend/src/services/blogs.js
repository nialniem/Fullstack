import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

const getAll = async () => {
  return [
    { id: '1', title: 'Things i dont know as of 2018', author: 'Dan Abramov' },
    { id: '2', title: 'Mocroservices and the first law of distributed objects', author: 'Martin Fowler' },
  ]
}

export default { getAll }

