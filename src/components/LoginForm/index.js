import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {
    userIdInput: '',
    pinIdInput: '',
    showSubmitError: '',
    errorMsg: '',
  }

  onChangeUserId = event => {
    this.setState({userIdInput: event.target.value})
  }

  onChangePin = event => {
    this.setState({pinIdInput: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    console.log(errorMsg)
    this.setState({
      showSubmitError: true,
      errorMsg,
    })
  }

  submitForm = async event => {
    event.preventDefault()
    const {userIdInput, pinIdInput} = this.state
    const userDetails = {user_id: userIdInput, pin: pinIdInput}
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {userIdInput, pinIdInput, showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="LoginForm-container">
        <div className="login-form-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            className="website-login"
            alt="website login"
          />
        </div>

        <form className="login-form" onSubmit={this.submitForm}>
          <h1 className="title">Welcome Back!</h1>
          <div className="input-container">
            <label className="label-text" htmlFor="userId">
              User ID
            </label>
            <input
              type="text"
              id="userId"
              className="input-box"
              placeholder="Enter User ID"
              value={userIdInput}
              onChange={this.onChangeUserId}
            />
          </div>
          <div className="input-container">
            <label className="label-text" htmlFor="pinId">
              PIN
            </label>
            <input
              type="password"
              className="input-box"
              value={pinIdInput}
              id="pinId"
              onChange={this.onChangePin}
              placeholder="Enter User ID"
            />
          </div>
          <button className="login" type="submit">
            Login
          </button>
          {showSubmitError && <p>*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}
export default LoginForm
