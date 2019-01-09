import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Nav from './Nav'
import Home from './Home'
import SignIn from './Sign-In'
import Register from './Register'
import Summary from './Summary'
import axios from 'axios'

class App extends Component {
  constructor() {
    super()
    this.state = {
      user: null
    }
  }
    getUser = (token) => {
        axios.get(`http://localhost:5000/get-user?token=${token}`)
            .then(response => {
                if(response.data.status === 200) {
                    this.setState({user: response.data.email})
                }
            }).catch(error => {
                alert(error)
            })
    }

    logOut = () => {
        localStorage.removeItem('jwt')
        return this.setState({user: null})
    }

  render() {
      const { user } = this.state 
    return (
      <BrowserRouter>
        <div>
          <Nav user={user} logOut={this.logOut}/>
          <Switch>
            <Route exact path="/" render={props => <Home {...props} user={user} getUser={this.getUser}/>} />
            <Route path="/sign-in" render={props => <SignIn {...props} user={user} />} />
            <Route path="/register" render={props => <Register {...props} />} />
            <Route path='/summary' render={props => <Summary {...props} user={user} getUser={this.getUser}/>} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
