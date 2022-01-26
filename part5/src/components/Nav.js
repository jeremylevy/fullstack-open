import React from 'react'
import { Link } from 'react-router-dom'

const Nav = ({ loggedUser, handleLogout }) => {
  return (
    <div>
      <p style={{ backgroundColor: 'silver', padding: 8 }}>
        <Link to="/blogs">blogs</Link>
        &nbsp;
        <Link to="/users">users</Link>
        &nbsp;
        { loggedUser.name } logged in&nbsp;
        <button onClick={handleLogout}>logout</button>
      </p>
    </div>
  )
}

export default Nav