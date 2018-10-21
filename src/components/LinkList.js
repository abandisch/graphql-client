import React from 'react'
import { Query } from 'react-apollo'
import Link from './Link'
import { FEED_QUERY } from '../lib/graphql/Queries'

class LinkList extends React.Component {
  render () {
    return (
      <Query query={FEED_QUERY}>
        {
          ({ loading, error, data }) => {
            if (loading) return <p>Loading ...</p>
            if (error) return <p>Error! {error}</p>

            const linksToRender = data.feed.links
            return linksToRender.map((link, index) => <Link key={link.id} link={link} index={index} />)
          }
        }
      </Query>
    )
  }
}

export default LinkList
