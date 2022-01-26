import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

const create = (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.post(baseUrl, newBlog, config)
  return request.then(response => response.data)
}

const update = (blog) => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.put(`${baseUrl}/${blog.id}`, blog, config)
  return request.then(response => response.data)
}

const remove = (blog) => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.delete(`${baseUrl}/${blog.id}`, config)
  return request.then(response => response.data)
}

const comment = (blog, comment) => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.post(`${baseUrl}/${blog.id}/comments`, { comment }, config)
  return request.then(response => response.data)
}

export default {
  getAll,
  setToken,
  create,
  update,
  remove,
  comment
}