const mongoose = require('mongoose')

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
    name: String,
    number: String,
})

personSchema.set('toJSON', {
    transform: (doc, returnedDoc) => {
        returnedDoc.id = returnedDoc._id.toString()
        delete returnedDoc._id
        delete returnedDoc.__v
    },
})

module.exports = mongoose.model('Person', personSchema)
