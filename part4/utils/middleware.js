const jwt = require('jsonwebtoken')
const User = require('../models/user')
const logger = require('./logger')

const tokenExtractor = (request, response, next) => {
  // eg: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZTNlYjdjYmY2M...
  const authorizationHeader = String(request.get('authorization'))
  const [_, token] = authorizationHeader.split(' ')

  request.token = token

  next()
}

const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  request.user = user

  next()
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  }

  next(error)
}

module.exports = {
  tokenExtractor,
  userExtractor,
  errorHandler
}