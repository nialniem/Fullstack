const usersRouter = require('express').Router()
const bcrypt = require('bcrypt') 
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
  try {
    const { username, password, name } = request.body

    if (!username || username.length < 3) {
      return response.status(400).json({ error: 'username is required and must be at least 3 characters long' })
    }
    if (!name) {
      return response.status(400).json({ error: 'name is required' })
    }
    if (!password || password.length < 3) {
      return response.status(400).json({ error: 'password is required and must be at least 3 characters long' })
    }

    // Tarkista ettei username ole jo käytössä
    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return response.status(400).json({ error: 'username must be unique' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash,
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }
})

module.exports = usersRouter
