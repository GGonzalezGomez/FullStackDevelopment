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

export default { getAll, createNewBlog }