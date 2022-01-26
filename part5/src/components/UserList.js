import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { loadUsers } from '../reducers/usersReducer'

const UserList = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(loadUsers())
  }, [])

  return (
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
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

export default UserList