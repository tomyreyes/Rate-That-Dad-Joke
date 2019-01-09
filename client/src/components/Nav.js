import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Navbar, NavbarBrand, NavItem, Nav } from 'reactstrap'

const Navigation = (props) => {
  return (
    <nav>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Rate That Dad Joke</NavbarBrand>
        <Nav className="ml-auto" navbar>
          {props.user ? (
            <React.Fragment>
              <NavItem>
                <Link to="/summary">
                  <Button color="info">Summary</Button>
                </Link>
              </NavItem>
              <NavItem>
                <Button color="warning" onClick={props.logOut}>
                  Log Out
                </Button>
              </NavItem>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <NavItem>
                <Link to="/sign-in">
                  <Button color="info">Sign-In</Button>
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/register">
                  <Button color="warning">Register</Button>
                </Link>
              </NavItem>
            </React.Fragment>
          )}
        </Nav>
      </Navbar>
    </nav>
  )
}

export default Navigation
