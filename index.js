require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const app = express()

mongoose.connect(process.env.MONGO_ATLAS_URI)

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean
})

const Note = mongoose.model('Note', noteSchema)

app.use(express.json())

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        date: "2019-05-30T17:30:31.098Z",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only Javascript",
        date: "2019-05-30T18:39:34.091Z",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        date: "2019-05-30T19:20:14.298Z",
        important: true
    }
]

const requestLogger = (request, response, next) => {
    console.log('Method', request.method);
    console.log('Path: ', request.path);
    console.log('Body: ', request.body);
    console.log('================================');

    next()
}

app.use(requestLogger)

app.get('/', (request, response) => {
    response.send('<h1> Hello World </h1>')
})

app.get('/api/notes', (request, response) => {
    Note.find({}).then( notes => {
        response.json(notes)
    })
})

app.get('/api/notes/:id', (request, response) => {    
    Note.findById(request.params.id).then(note => response.json(note)).catch(error => {
        console.log(error);
        response.status(400).json({error: 'malformatted id'})
    })
})

app.delete('/api/notes/:id', (request, response) => {
    Note.deleteOne({id: request.params.id}).then(deletedNote => response.json(deletedNote))
})

const generateId = () => {
    const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0

    return maxId + 1
}

app.post('/api/notes', (request, response) => {
    const body = request.body

    if(!body.content){
        return response.status(404).json({
            error: 'content missing'
        })
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generateId()
    })

    note.save().then(savedNote => {
        response.json(savedNote)
    })
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({message: "unknown endpoint"})
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on PORT ${PORT}`);
