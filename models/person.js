const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI
console.log('Connecting to ', url)

mongoose
    .connect(url, { useNewUrlParser: true })
    .then(result => {
        console.log('Connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB', error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        minlength: 3,
    },
    number: {
        type: String,
        minlength: 8,
    },
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
    transform: (doc, returnedDoc) => {
        returnedDoc.id = returnedDoc._id.toString()
        delete returnedDoc._id
        delete returnedDoc.__v
    },
})

module.exports = mongoose.model('Person', personSchema)
