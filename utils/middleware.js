const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('Method', request.method)
  logger.info('Path: ', request.path)
  logger.info('Body: ', request.body)
  logger.info('================================')

  next()
}

const errorHandler = (error, request, response, next ) => {
  logger.error(error.message)

  if(error.name === 'CastError'){
    response.status(400).json({ error: 'malformatted id' })
  }else if(error.name === 'ValidationError'){
    response.status(400).json({ error: error.name })
  }

  next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ message: 'unknown endpoint' })
}

module.exports = {
  requestLogger,
  errorHandler,
  unknownEndpoint
}
