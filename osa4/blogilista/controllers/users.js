const usersRouter = require('express').Router()

usersRouter.get('/', async (req, res) => {
  res.json([])
})

usersRouter.post('/', async (req, res) => {
  res.status(501).json({ error: 'not implemented yet' })
})

module.exports = usersRouter
