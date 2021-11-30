const notesRouter = require('express').Router()
const Note = require('../models/notes')

notesRouter.get('/', (request, response) => {
  Note.find({}).then( notes => {
    response.json(notes)
  })
})

notesRouter.get('/:id', (request, response, next) => {
  Note.findById(request.params.id).then(note => response.json(note)).catch(error => next(error))
})

notesRouter.delete('/:id', (request, response) => {
  Note.deleteOne({ id: request.params.id }).then(deletedNote => response.json(deletedNote))
})

notesRouter.post('/', (request, response, next) => {
  const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  }).catch(error => {
    next(error)
  })
})

module.exports = notesRouter
