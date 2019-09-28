/**
 * node mongo.js yourpassword Anna 040-1234556
 * result: added Anna number 040-1234556 to phonebook
 *
 * node mongo.js yourpassword
 * result:
 *  phonebook:
 *  Anna 040-1234556
 *  Arto Vihavainen 045-1232456
 *  Ada Lovelace 040-1231236
 */
const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0-msl70.azure.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length < 4) {
    Person.find({}).then(persons => {
        console.log('phonebook:')
        persons.forEach(person => {
            console.log(person.name + ' ' + person.number)
        })

        mongoose.connection.close()
        process.exit(1)
    })
}

const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
})

person.save().then(result => {
    console.log(
        `added ${process.argv[3]} number ${process.argv[4]} to phonebook`
    )

    mongoose.connection.close()
})
