import React from 'react'
import { Query } from 'react-apollo'
import Link from './Link'
import { FEED_QUERY } from '../lib/graphql/Queries'

class LinkList extends React.Component {
  _updateCacheAfterVote (store, createVote, linkId) {
    // read the current state of the cached data for the FEED_QUERY from the store
    const data = store.readQuery({ query: FEED_QUERY })

    // retrieve the link that the user just voted for from that list
    const votedLink = data.feed.links.find(link => link.id === linkId)

    // update the votes array
    votedLink.votes = createVote.link.votes

    // take the modified data and write it back into the store
    store.writeQuery({ query: FEED_QUERY, data })
  }

  render () {
    return (
      <Query query={FEED_QUERY}>
        {
          ({ loading, error, data }) => {
            if (loading) return <p>Loading ...</p>
            if (error) return <p>Error! {error}</p>

            const linksToRender = data.feed.links
            return linksToRender.map((link, index) => <Link key={link.id} link={link} index={index} updateStoreAfterVote={this._updateCacheAfterVote} />)
          }
        }
      </Query>
    )
  }
}

export default LinkList
