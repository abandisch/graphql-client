import React from 'react'
import { setAuthToken } from '../lib/utils'

class Login extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      login: true, // switch between Login and SignUp
      email: '',
      password: '',
      name: ''
    }
  }

  async _confirm () {
    // ... you'll implement this 🔜
  }

  _saveUserData (token) {
    setAuthToken(token)
  }

  render () {
    const { login, email, password, name } = this.state
    return (
      <div>
        <h4 className='mv3'>{login ? 'Login' : 'Sign Up'}</h4>
        <div className='flex flex-column'>
          {!login && (
            <input
              value={name}
              onChange={e => this.setState({ name: e.target.value })}
              type='text'
              placeholder='Your name'
            />
          )}
          <input
            value={email}
            onChange={e => this.setState({ email: e.target.value })}
            type='text'
            placeholder='Your email address'
          />
          <input
            value={password}
            onChange={e => this.setState({ password: e.target.value })}
            type='password'
            placeholder='Choose a safe password'
          />
        </div>
        <div className='flex mt3'>
          <div className='pointer mr2 button' onClick={() => this._confirm()}>
            {login ? 'login' : 'create account'}
          </div>
          <div
            className='pointer button'
            onClick={() => this.setState({ login: !login })}
          >
            {login
              ? 'need to create an account?'
              : 'already have an account?'}
          </div>
        </div>
      </div>
    )
  }
}

export default Login
