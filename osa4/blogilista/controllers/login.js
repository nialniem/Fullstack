const loginRouter = require('express').Router()

loginRouter.post('/', async (req, res) => {
  res.status(501).json({ error: 'not implemented yet' })
})

module.exports = loginRouter
