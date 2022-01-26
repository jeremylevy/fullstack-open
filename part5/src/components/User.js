import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { loadUsers } from '../reducers/usersReducer'

const User = () => {
  const dispatch = useDispatch()
  const userId = useParams().id
  const user = useSelector(state => state.users.find(user => user.id === userId))

  useEffect(() => {
    if (user) {
      return
    }

    dispatch(loadUsers())
  }, [])

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>

      <ul>
        {
          user.blogs.map(blog => (
            <li key={blog.id}>
              { blog.title }
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default User