import React from 'react'
import { Mutation } from 'react-apollo'
import { getAuthToken, timeDifferenceForDate } from '../lib/utils'
import { VOTE_MUTATION } from '../lib/graphql/Mutations'

class Link extends React.Component {
  render () {
    const authToken = getAuthToken()

    return (
      <div className='flex mt2 items-start'>
        <div className='flex items-center'>
          <span className='gray'>{this.props.index + 1}.</span>
          {authToken && (
            <Mutation
              mutation={VOTE_MUTATION}
              variables={{ linkId: this.props.link.id }}
              update={(store, { data: { vote } }) => {
                this.props.updateStoreAfterVote(store, vote, this.props.link.id)
              }}
            >
              {
                (voteMutation) => (
                  <div className='ml1 gray f11' onClick={voteMutation}>
                    ▲
                  </div>
                )
              }
            </Mutation>
          )}
        </div>
        <div className='ml1'>
          <div>
            {this.props.link.description} ({this.props.link.url})
          </div>
          <div className='f6 lh-copy gray'>
            {this.props.link.votes.length} votes | by{' '}
            {this.props.link.postedBy
              ? this.props.link.postedBy.name
              : 'Unknown'}{' '}
            {timeDifferenceForDate(this.props.link.createdAt)}
          </div>
        </div>
      </div>
    )
  }
}

export default Link
