import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { loadUsers } from '../reducers/usersReducer'

const UserList = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(loadUsers())
  }, [])

  return (
    <div>
      <h2>users</h2>

      <table>
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">blogs created</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map(user => (
              <tr key={user.id}>
                <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                <td>{user.blogs.length}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default UserList