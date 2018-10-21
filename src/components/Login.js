import React from 'react'
import { Mutation } from 'react-apollo'
import { LOGIN_MUTATION, SIGNUP_MUTATION } from '../lib/graphql/Mutations'
import { setAuthToken } from '../lib/utils'

const LoginButton = ({ mutation, variables, onCompleted, btnText }) => {
  return (
    <Mutation mutation={mutation} variables={variables} onCompleted={onCompleted}>
      {
        (mutation, { loading, error }) => {
          const props = {
            disabled: false,
            text: loading ? 'Loading ...' : btnText
          }
          if (loading) props.disabled = true

          return (
            <React.Fragment>
              {
                error && <span>{error.message}</span>
              }
              <button disabled={props.disabled} type='button' className='pointer mr2 button' onClick={mutation}>
                {props.text}
              </button>
            </React.Fragment>
          )
        }
      }
    </Mutation>
  )
}

class Login extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      login: true, // switch between Login and SignUp
      email: '',
      password: '',
      name: ''
    }

    this._confirm = this._confirm.bind(this)
  }

  async _confirm (data) {
    const { token } = this.state.login ? data.login : data.signup
    this._saveUserData(token)
    this.props.history.push('/')
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
          <LoginButton
            mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
            variables={{ email, password, name }}
            onCompleted={data => this._confirm(data)}
            btnText={login ? 'login' : 'create account'}
          />
          <button type='button' className='pointer button' onClick={() => this.setState({ login: !login })}>
            {login
              ? 'need to create an account?'
              : 'already have an account?'}
          </button>
        </div>
      </div>
    )
  }
}

export default Login
