import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Nav from './Nav'
import Home from './Home'
import SignIn from './Sign-In'
import Register from './Register'


const App = () => (
        <BrowserRouter>
            <div>
                <Nav/>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/sign-in" component={SignIn} />
                        <Route path="/register" component={Register} />
                    </Switch>
            </div>
        </BrowserRouter>
    )

export default App
