import React from 'react'
import * as EmailValidator from 'email-validator'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import { apiClient } from '../../utils/api/client'

const useStyles = () => {
  return {
    container: {
      textAlign: 'center',
    },
    loginForm: {
      height: '16em',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 'calc(10px + 2vmin)',
    },
    loginTitle: {
      height: '2em',
    },
    emailInput: {
      marginBottom: '2em',
    },
    loginButton: {
      margin: '0',
      height: '4em'
    },
  }
}

class Login extends React.Component {
  constructor(props) {
    super(props)

    this._isDestroyed = false

    this.state = {
      isEmailValid: false,
      email: '',

      canInputOneTimePassword: false,
      isOneTimePasswordValid: false,
      oneTimePassword: '',

      tryingToEmailPass: false,
      tryingToLogin: false,
    }
  }

  componentWillUnmount() {
    this._isDestroyed = true
  }

  emailOneTimePassClickHandler = () => {
    if (this.state.isEmailValid === false) {
      return
    }

    this.tryToEmailOneTimePass()
  }

  loginClickHandler = () => {
    if (this.state.isEmailValid === false) {
      return
    }

    this.tryToLogin()
  }

  handleOTPEditUpdate = (e) => {
    if (!e || !e.target) {
      return
    }

    const otp = e.target.value

    if (typeof otp !== 'string' || otp.length === 0) {
      return
    }

    this.setState({ oneTimePassword: otp })
    this.setState({ isOneTimePasswordValid: true })
  }

  handleOTPEditKeyUp = (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      if (this.state.isOneTimePasswordValid === false) {
        return
      }

      this.tryToLogin()
    }
  }

  handleEmailEditUpdate = (e) => {
    if (!e || !e.target) {
      return
    }

    const email = e.target.value

    if (typeof email !== 'string' || email.length === 0) {
      return
    }

    this.setState({ email })
    this.setState({ isEmailValid: EmailValidator.validate(email) })
  }

  handleEmailEditKeyUp = (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      if (this.state.isEmailValid === false) {
        return
      }

      this.tryToEmailOneTimePass()
    }
  }

  tryToEmailOneTimePass = () => {
    this.setState({ tryingToEmailPass: true })

    apiClient
      .emailOneTimePassword({ email: this.state.email })
      .then((response) => {
        if (this._isDestroyed) {
          return
        }

        this.setState({ tryingToEmailPass: false })
        this.setState({ canInputOneTimePassword: true })
      })
      .catch((err) => {
        this.setState({ tryingToEmailPass: false })
        this.setState({ canInputOneTimePassword: false })
      })
  }

  tryToLogin = () => {
    this.setState({ tryingToLogin: true })

    apiClient
      .login({ email: this.state.email, oneTimePassword: this.state.oneTimePassword })
      .then((response) => {
        if (this._isDestroyed) {
          return
        }

        this.setState({ tryingToLogin: false })
        this.props.onLogin(response.email, response.oneTimePassword)
      })
      .catch((err) => {
        this.setState({ tryingToLogin: false })
      })
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.container}>
        <header className={classes.loginForm}>
          <div className={classes.loginTitle}>Log in to Rooms</div>

          <TextField
            autoFocus
            className={classes.emailInput}
            color="secondary"
            variant="outlined"
            defaultValue={this.state.email}
            label="e-mail"
            onChange={this.handleEmailEditUpdate}
            onKeyUp={this.handleEmailEditKeyUp}
            disabled={this.state.tryingToLogin || this.state.tryingToEmailPass}
          />

          {
            (this.state.isEmailValid === true) ?

            <div className={classes.loginButton}>
              <Button
                variant="contained"
                color="primary"
                onClick={this.emailOneTimePassClickHandler}
                disabled={this.state.tryingToLogin || this.state.tryingToEmailPass}
              >
                Email Me A Password
              </Button>
            </div> :

            <div className={classes.loginButton} />
          }

          {
            (this.state.canInputOneTimePassword === true) ?

            <div className={classes.loginButton}>
              <TextField
                autoFocus
                className={classes.emailInput}
                color="secondary"
                variant="outlined"
                defaultValue={this.state.oneTimePassword}
                label="One Time Password"
                onChange={this.handleOTPEditUpdate}
                onKeyUp={this.handleOTPEditKeyUp}
                disabled={this.state.tryingToLogin || this.state.tryingToEmailPass}
              />
            </div> :

            <div className={classes.loginButton} />
          }

          {
            (this.state.isOneTimePasswordValid === true) ?

            <div className={classes.loginButton}>
              <Button
                variant="contained"
                color="primary"
                onClick={this.loginClickHandler}
                disabled={this.state.tryingToLogin || this.state.tryingToEmailPass}
              >
                Connect
              </Button>
            </div> :

            <div className={classes.loginButton} />
          }
        </header>
      </div>
    )
  }
}

export default withStyles(useStyles)(Login)
