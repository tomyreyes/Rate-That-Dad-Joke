import React, { Component } from 'react'
import { getJWT } from '../components/utils/JWT'
import axios from 'axios'

class Summary extends Component {
  constructor() {
    super()
    this.state = {
      ratings: null,
      jokes: null
    }
  }

  getSummary = () => {
    const { user } = this.props
    axios
      .post('http://localhost:5000/get-summary', {
        user
      })
      .then(response => {
        if (response.data.status === 200) {
          this.setState({
            ratings: response.data.ratings_list,
            jokes: response.data.jokes_list
          })
        }
      })
  }

  componentDidMount() {
    const { user } = this.props
    const jwt = getJWT()
    if (!jwt) {
      return this.props.history.push('/sign-in')
    }
    if (!user) {
      this.props.getUser(jwt)
    } else {
      return this.getSummary()
    }
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props
    if (prevProps.user !== user && user) {
      return this.getSummary()
    }
    if (!user) {
      return this.props.history.push('/sign-in')
    }
  }
  render() {
    const { ratings, jokes } = this.state
    let summary
    if (jokes) {
      summary = jokes.map((joke, index) => {
        return (
          <li key={index}>
            {joke} - {ratings[index]}
          </li>
        )
      })
    }

    return (
      <div>
        <h1>Summary</h1>
        {jokes ? <ul>{summary}</ul> : <h1>Loading </h1>}
      </div>
    )
  }
}

export default Summary
