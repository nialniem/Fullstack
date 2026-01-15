const login = async ({ username, password }) => {
    // halutessasi tarkistus:
    // if (username !== 'mluukkai' || password !== 'salainen') throw new Error('wrong credentials')
  
    return {
      username,
      name: username,
      token: 'fake-token',
    }
  }
  
  export default { login }
  