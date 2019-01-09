import React, { Component } from 'react'
import { Button } from 'reactstrap'
import { getJWT } from '../components/utils/JWT'
import axios from 'axios'

class Home extends Component {
  constructor() {
    super()
    this.state = {
      start: false,
      currentJoke: null,
      id: null,
      initialGeneration: false
    }
  }

  getJoke = () => {
    const { id } = this.state
    const { user } = this.props
    axios
      .post('http://localhost:5000/get-joke', {
        user,
        id
      })
      .then(response => {
        return this.setState({
          currentJoke: response.data.joke,
          id: response.data.id
        })
      })
      .catch(error => alert(error))
  }

  generateJokes = () => {
      this.setState({
          initialGeneration:true
      })
      this.getJoke()
  }

  componentDidMount() {
    const jwt = getJWT()
    if (!jwt) {
      return this.props.history.push('sign-in')
    }
    this.props.getUser(jwt)
  }

  componentDidUpdate() {
    const { user } = this.props
    if (!user) {
      return this.props.history.push('sign-in')
    }
  }
  rateJoke = e => {
    e.preventDefault()
    const { user } = this.props
    const { id, currentJoke } = this.state
    axios
      .post('http://localhost:5000/rate-joke', {
        user,
        joke: currentJoke,
        joke_id: id,
        rating: e.target.name
      })
      .then(response => {
        if (response.data.status === 200) {
          return this.getJoke()
        } else return alert(response.data.message)
      })
      .catch(error => alert(error))
  }

  render() {
    const { currentJoke, initialGeneration } = this.state

    return (
      <div>
        <h1>Rate That Dad Joke</h1>
        {!initialGeneration && (
          <Button onClick={this.generateJokes}>Generate Joke</Button>
        )}

        {currentJoke && initialGeneration && (
          <div>
            <h3>{currentJoke}</h3>
            <Button name="Like" onClick={this.rateJoke}>
              Like
            </Button>
            <Button name="Don't Like" onClick={this.rateJoke}>
              Don't Like
            </Button>
            <Button name="Don't Care" onClick={this.rateJoke}>
              Don't Care
            </Button>
          </div>
        ) }
        {initialGeneration && !currentJoke && <h5>Loading....</h5>}
      </div>
    )
  }
}

export default Home
