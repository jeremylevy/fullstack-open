import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => (
  axios
    .get(baseUrl)
    .then(response => response.data)
)

const create = person => (
  axios
    .post(baseUrl, person)
    .then(response => response.data)
)

const update = person => (
  axios
    .put(`${baseUrl}/${person.id}`, person)
    .then(response => response.data)
)

const remove = person => (
  axios
    .delete(`${baseUrl}/${person.id}`)
    .then(response => response.data)
)

export default { getAll, create, update, remove }
