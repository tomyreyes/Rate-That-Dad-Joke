import React, { Component } from 'react'
import { getJWT } from '../components/utils/JWT'
import axios from 'axios'
import { Container, ListGroup, ListGroupItem } from 'reactstrap'

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
          console.log(response.data.ratings_list)
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
          <ListGroupItem
            key={joke}
            color={
              ratings[index] === "Like"
                ? "success"
                : ratings[index] === "Don't Like"
                ? "danger"
                : "secondary"
            }
          >
            {joke} <b>Rating:</b> {ratings[index]}
          </ListGroupItem>
        )
      })
    }

    return (
      <Container>
        <h1 className="title">Summary</h1>
        <h5>Here is the history of the jokes you have rated.</h5>
        {jokes ? <ListGroup>{summary}</ListGroup> : <h1>Loading </h1>}
      </Container>
    )
  }
}

export default Summary
