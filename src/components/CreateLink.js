import React from 'react'

class CreateLink extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      description: '',
      url: ''
    }
  }

  render () {
    const { description, url } = this.state

    return (
      <div>
        <div className='flex flex-column mt3'>
          <input
            type='text'
            value={description}
            onChange={(e) => this.setState({ description: e.target.value })}
            placeholder='A description for the link'
          />
          <input
            type='text'
            value={url}
            onChange={(e) => this.setState({ url: e.target.value })}
            placeholder='The URL for the link'
          />
          <button onClick={`... you'll implement this 🔜`}>Submit</button>
        </div>
      </div>
    )
  }
}

export default CreateLink
