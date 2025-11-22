import React from 'react'

const Sample = (value) => {
  return (
    <div>
        <h1>Sample Page</h1>
        <p>My name is {value.name}</p>
        <p>My regno is {value.regno}</p>
        <p>My Branch is {value.branch}</p>
        <p>My section is {value.section}</p>
    </div>
  )
}

export default Sample