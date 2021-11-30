
const requestLogger = (request, response, next) => {
  console.log('Method', request.method)
  console.log('Path: ', request.path)
  console.log('Body: ', request.body)
  console.log('================================')

  next()
}

const errorHandler = (error, request, response, next ) => {
  console.error(error.message)

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
