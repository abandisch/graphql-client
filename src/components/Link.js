import React from 'react'

const Link = ({ link }) => {
  return (
    <div>
      <div>
        <p>{link.description} ({link.url})</p>
      </div>
    </div>
  )
}

export default Link
