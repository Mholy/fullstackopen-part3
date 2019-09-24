const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

app.use(express.static('build'))

app.use(cors())

app.use(bodyParser.json())

morgan.token('post-body', req => JSON.stringify(req.body))
app.use(
    morgan(
        ':method :url :status :res[content-length] - :response-time ms :post-body'
    )
)

let persons = [
    {
        name: 'Arto Hellas',
        number: '040-123456',
        id: 1,
    },
    {
        name: 'Ada Lovelace',
        number: '39-44-5323523',
        id: 2,
    },
    {
        name: 'Dan Abramov',
        number: '12-43-234345',
        id: 3,
    },
    {
        name: 'Mary Poppendieck',
        number: '39-23-6423122',
        id: 4,
    },
]

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
    res.send(`
        <div>Phonebook has info for ${persons.length} people</div>
        <div>${new Date()}</div>
    `)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)

    const person = persons.find(person => person.id === id)

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)

    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

const findPerson = name => persons.find(person => person.name === name)

app.post('/api/persons', (req, res) => {
    const body = req.body
    console.log(typeof body)

    if (!body.name) {
        return res.status(400).json({ error: 'name is missing' })
    }

    if (!body.number) {
        return res.status(400).json({ error: 'number is missing' })
    }

    if (findPerson(body.name)) {
        return res.status(400).json({ error: 'name must be unique' })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random() * 10000),
    }

    persons = persons.concat(person)

    res.json(persons)
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
