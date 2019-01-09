import React, { Component } from 'react'
import { Button } from 'reactstrap'
import { getJWT } from '../components/utils/JWT'


class Home extends Component {
  componentDidMount() {
    const jwt = getJWT()
    if (!jwt) {
      this.props.history.push('sign-in')
    }
    
    return this.props.getUser(jwt)
   
  }
  render() {
    console.log(this.props)
    return (
      <div>
        Home
        <Button>Hi</Button>
      </div>
    )
  }
}

export default Home
