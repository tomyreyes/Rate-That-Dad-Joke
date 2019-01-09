import React, { Component } from 'react'
import FormValidator from './utils/FormValidator'
import { Container, Button, Form, FormGroup, Label, Input } from 'reactstrap'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

class SignIn extends Component {
  constructor() {
    super()
    this.validator = new FormValidator([
      {
        field: 'email',
        method: 'isEmpty',
        validWhen: false,
        message: 'Email is required.'
      },
      {
        field: 'email',
        method: 'isEmail',
        validWhen: true,
        message: 'That is not a valid email.'
      },
      {
        field: 'password',
        method: 'isEmpty',
        validWhen: false,
        message: 'Password is required.'
      }
    ])

    this.state = {
      email: '',
      password: '',
      passwordConfirmation: '',
      validation: this.validator.valid(),
      errorMessage: null
    }

    this.submitted = false
  }

  handleInputChange = event => {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleFormSubmit = event => {
    event.preventDefault()
    const { email, password } = this.state
    const validation = this.validator.validate(this.state)
    this.setState({ validation })
    this.submitted = true
    if (validation.isValid) {
      axios
        .post('http://localhost:5000/login', {
          email,
          password
        })
        .then(response => {
          if (response.data.status === 200) {
            localStorage.setItem('jwt', response.data.token)
            this.setState({ user: response.data.email })
            return this.props.history.push('/')
          } else if (response.data.status === 400) {
            return this.setState({
              errorMessage: response.data.message
            })
          } else return alert('Server Error')
        })
        .catch(error => {
          return alert(error)
        })
    }
  }

  render() {
    const { errorMessage } = this.state
    let validation = this.submitted
      ? this.validator.validate(this.state)
      : this.state.validation

    return (
      <Container>
        <h1 className="title">Sign In</h1>
        <Form>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Enter email"
              onChange={this.handleInputChange}
            />
            <span className="form-feedback"> {validation.email.message}</span>
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Enter a password"
              onChange={this.handleInputChange}
            />
            <span className="form-feedback">
              {' '}
              {validation.password.message}
            </span>
            <span className="form-feedback">{errorMessage}</span>
          </FormGroup>
          <Button color="primary" type="submit" onClick={this.handleFormSubmit}>
            Submit
          </Button>
        </Form>
      </Container>
    )
  }
}

export default SignIn
