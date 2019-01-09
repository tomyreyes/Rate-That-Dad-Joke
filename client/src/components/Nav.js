import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Nav extends Component {
  render() {
    const { user } = this.props
    return (
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {user ? (
            <React.Fragment>
              <li>
                <Link to="/summary">Summary</Link>
              </li>
              <li>
                <button onClick={this.props.logOut}>Log Out</button>
              </li>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <li>
                <Link to="/sign-in">Sign-In</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </React.Fragment>
          )}
        </ul>
      </nav>
    )
  }
}

export default Nav
