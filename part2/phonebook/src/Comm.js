import axios from 'axios'

//const baseURL = 'http://192.168.56.99:3001/api/persons'
//const baseURL = 'http://localhost:3001/api/persons'
//const baseURL = 'https://glacial-badlands-79242.herokuapp.com/api/persons'
const baseURL = '/api/persons'

const getAll = () => {
	const request = axios.get(baseURL)
	return request.then(response => response.data)
}

const create = newContact => {
	const request = axios.post(baseURL, newContact)
	return request.then(response => response.data)
}

const update = (id, contactInfo) => {
	const request = axios.put(`${baseURL}/${id}`, contactInfo)
	return request.then(response => response.data)
}

const delContact = id => {
	const request = axios.delete(`${baseURL}/${id}`)
	return request.then(response => response.data)
}

export default {
	getAll: getAll,
	create: create,
	update: update,
	delContact: delContact
}
