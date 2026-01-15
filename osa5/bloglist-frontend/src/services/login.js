const login = async ({ username, password }) => {
    if (username !== 'mluukkai' || password !== 'salainen') {
      throw new Error('wrong credentials')
    }
  
    return {
      username,
      name: 'Matti Luukkainen',
      token: 'fake-token',
    }
  }
  
  export default { login }
  