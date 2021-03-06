import React, { Component } from 'react'
import FormValidator from './utils/FormValidator'
import { Button, Container, Form, FormGroup, Label, Input } from 'reactstrap'
import axios from 'axios'

class Register extends Component {
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
      },
      {
        field: 'passwordConfirmation',
        method: 'isEmpty',
        validWhen: false,
        message: 'Password confirmation is required.'
      },
      {
        field: 'passwordConfirmation',
        method: this.passwordMatch,
        validWhen: true,
        message: 'Password and password confirmation do not match.'
      }
    ])

    this.state = {
      email: '',
      password: '',
      passwordConfirmation: '',
      validation: this.validator.valid()
    }

    this.submitted = false
  }

  passwordMatch = (confirmation, state) => state.password === confirmation

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
        .post('http://localhost:5000/user-registration', {
          email,
          password
        })
        .then(response => {
          if (response.data.status === 200) {
            return this.props.history.push('/sign-in')
          } else if (response.data.status === 400) {
            return alert(response.data.message)
          } else return alert('Server Error')
        })
        .catch(error => {
          return alert(error)
        })
    }
  }

  render() {
    let validation = this.submitted
      ? this.validator.validate(this.state)
      : this.state.validation

    return (
      <Container>
        <h1 className="title">Register</h1>
        <Form onSubmit={this.handleFormSubmit}>
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
          </FormGroup>
          <FormGroup>
            <Label for="passwordConfirmation">Password</Label>
            <Input
              type="password"
              name="passwordConfirmation"
              id="passwordConfirmation"
              placeholder="Confirm your password"
              onChange={this.handleInputChange}
            />
            <span className="form-feedback">
              {' '}
              {validation.passwordConfirmation.message}
            </span>
          </FormGroup>
          <Button color="success" onClick={this.handleFormSubmit}>
            Submit
          </Button>
        </Form>
      </Container>
    )
  }
}

export default Register
