const getAll = async () => {
  return [
    { id: '1', title: 'Things i dont know as of 2018', author: 'Dan Abramov',url: 'https://example.com/1', likes: 7 },
    { id: '2', title: 'Mocroservices and the first law of distributed objects', author: 'Martin Fowler',url: 'https://example.com/2', likes: 5 },
  ]
}

export default { getAll }

