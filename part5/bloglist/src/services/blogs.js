import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createNewBlog = async (props) => {
  const config = {
    headers: { "Authorization" : `Bearer ${props.user.token}` }
  }
  const newEntry = {'title': props.newTitle, 'author': props.newAuthor, 'url': props.newUrl}
  const response = await axios.post(baseUrl, newEntry, config)
  return response.data
}

const updateBlog = async (props) => {
  const config = {
    headers: { "Authorization" : `Bearer ${props.user.token}` }
  }
  const updatedEntry = {'title': props.title, 'author': props.author, 'url': props.url, 'likes': props.likes, 'user': props.userid}
  const response = await axios.put(`${baseUrl}/${props.id}`, updatedEntry, config)
  return response.data
}

const removeBlog = async (props) => {
  const config = {
    headers: { "Authorization" : `Bearer ${props.user.token}` }
  }
  const response = await axios.delete(`${baseUrl}/${props.id}`, config)
  return response.data
}

export default { getAll, createNewBlog, updateBlog, removeBlog }