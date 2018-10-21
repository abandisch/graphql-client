import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { getAuthToken, setAuthToken } from '../lib/utils'

class Header extends React.Component {
  render () {
    const authToken = getAuthToken()
    return (
      <div className='flex pa1 justify-between nowrap orange'>
        <div className='flex flex-fixed black'>
          <div className='fw7 mr1'>Hacker News</div>
          <Link to='/' className='ml1 no-underline black'>
            new
          </Link>
          {authToken && (
            <div className='flex'>
              <div className='ml1'>|</div>
              <Link to='/create' className='ml1 no-underline black'>
                submit
              </Link>
            </div>
          )}
        </div>
        <div className='flex flex-fixed'>
          {authToken ? (
            <div
              className='ml1 pointer black'
              onClick={() => {
                setAuthToken('')
                this.props.history.push(`/`)
              }}
            >
            logout
            </div>
          ) : (
            <Link to='/login' className='ml1 no-underline black'>
              login
            </Link>
          )}
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
