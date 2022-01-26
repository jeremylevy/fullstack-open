import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav as BootstrapNav, Button } from 'react-bootstrap'

const Nav = ({ loggedUser, handleLogout }) => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <BootstrapNav className="mr-auto">
          <BootstrapNav.Link href="#" as="span">
            <Link to="/blogs">blogs</Link>
          </BootstrapNav.Link>
          <BootstrapNav.Link href="#" as="span">
            <Link to="/users">users</Link>
          </BootstrapNav.Link>
          <BootstrapNav.Link href="#" as="span">
            { loggedUser.name } logged in&nbsp;
            <Button variant="secondary" onClick={handleLogout} size="sm">logout</Button>
          </BootstrapNav.Link>
        </BootstrapNav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Nav