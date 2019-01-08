import React, { Component } from 'react'
import { BrowserRouter,  Redirect, Route, Switch } from 'react-router-dom'
import Nav from './Nav'
import Home from './Home'
import SignIn from './Sign-In'
import Register from './Register'
import axios from 'axios';

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
    }
  }
    login = () => {
        this.setState({
            loggedIn: true
        })
    }

    logout = () => {
        this.setState({
            loggedIn: false
        })
        return axios.get('http://localhost:5000/login')
            .then(response => {
                if(response.data.status === 200) {
                    return 
                }
            })
            .catch(error => {
                return alert(error)
            })
    }

  render() {
      const { loggedIn } = this.state 
    return (
      <BrowserRouter>
        <div>
          <Nav loggedIn={loggedIn}/>
          <Switch>
            <PrivateRoute exact path="/" component={Home} loggedIn={loggedIn}/> 
            <Route path="/sign-in" render={props => <SignIn {...props} loggedIn={loggedIn} login={this.login} />} />
            <Route path="/register" render={props => <Register {...props} />} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

const PrivateRoute = ({ component: Component, loggedIn, ...rest,  }) => {
    console.log(loggedIn)
    return (
        <Route
            {...rest}
            render={props =>
                loggedIn ? (
                    <Component {...props} />
                ) : (
                        <Redirect
                            to={{
                                pathname: "/sign-in",
                                state: { from: props.location }
                            }}
                        />
                    )
            }
        />
    );
}
export default App
