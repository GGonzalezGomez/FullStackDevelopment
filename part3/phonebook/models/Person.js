const mongoose = require('mongoose')
const url = process.env.MONGODB_URI

console.log('Connecting to DB: ' + url)
// Check URL for deprecation warning settings: https://mongoosejs.com/docs/deprecations.html#-findandmodify-
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
	id: Number
})

const Person = mongoose.model('Person', personSchema)

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


module.exports = mongoose.model('Person', personSchema)
