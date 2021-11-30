require('dotenv').config()
const express = require('express')
const notesRouter = require('./controllers/notes')
const middleware = require('./utils/middleware')
const config = require('./utils/config')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

const app = express()

logger.info(`connecting to ${config.MONGODB_URI}`)
mongoose.connect(config.MONGODB_URI)
  .then(() => logger.info('successfully connect to database'))
  .catch(() => logger.error('failed connect to database'))

app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/notes', notesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
