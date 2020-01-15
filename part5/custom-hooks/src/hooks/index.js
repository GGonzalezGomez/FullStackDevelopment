import { useState } from 'react'
import axios from 'axios'

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])
    let token = null
  
    const create = async newObject => {
        const config = {
            headers: { Authorization: token },
        }

        const response = await axios.post(baseUrl, newObject, config)
        return response.data
    }

    const setToken = (newToken) => {
        token = `bearer ${newToken}`
    }

    const getAll = () => {
        const request = axios.get(baseUrl)
        return request.then(response => response.data)
    }

    const update = (id, newObject) => {
        const request = axios.put(`${ baseUrl } /${id}`, newObject)
        return request.then(response => response.data)
    }

    const updateResources = (newResources) => {
        setResources(newResources)
    }

    
    const service = {
        create, setToken, getAll, update, updateResources
    }
  
    return [resources, service ]
  }