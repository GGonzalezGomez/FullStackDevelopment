const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
	  console.log('give password as argument')
	  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0-pelkk.mongodb.net/phonebook?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
	id: Number
})

const Person = mongoose.model('Person', personSchema)

if ( process.argv.length === 3 ){
	console.log('phonebook:')
	
	Person.find({}).then(result => {
		result.forEach(contact => {
		  console.log(contact.name + ' ' + contact.number)
		})
		mongoose.connection.close()
	  })
}

if ( process.argv.length === 5 ){
	const contact = new Person({
		name: process.argv[3],
		number: process.argv[4],
		id: Math.ceil(Math.random()*100000)
	})

	contact.save().then(response => {
		console.log('added ' + process.argv[3] + ' number ' + process.argv[4] + ' to phonebook')
		mongoose.connection.close()
	})
}
