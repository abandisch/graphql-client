import React from 'react'
import { Mutation } from 'react-apollo'
import { POST_MUTATION } from '../lib/graphql/Mutations'
import { FEED_QUERY } from '../lib/graphql/Queries'

const CreateLinkButton = ({ description, url, onCompleted }) => {
  return (
    <Mutation
      mutation={POST_MUTATION}
      variables={{ description, url }}
      onCompleted={onCompleted}
      update={(store, { data: { post } }) => {
        const data = store.readQuery({ query: FEED_QUERY })
        data.feed.links.unshift(post)
        store.writeQuery({
          query: FEED_QUERY,
          data
        })
      }}
    >
      {
        (postMutation, { loading, error, data }) => {
          if (loading) return <button type='button'>Please wait</button>
          return (
            <React.Fragment>
              {
                error && <p>{error.message}</p>
              }
              <button onClick={postMutation}>Submit</button>
            </React.Fragment>
          )
        }
      }
    </Mutation>
  )
}

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
          <CreateLinkButton
            description={description}
            url={url}
            onCompleted={() => this.props.history.push('/')}
          />
        </div>
      </div>
    )
  }
}

export default CreateLink
