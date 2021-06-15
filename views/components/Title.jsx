const React = require('react')

const Title = ({ children }) => {
  return (
    <header className='title_container'>
      <h1 className='title'> {children} </h1>
    </header>
  )
}

module.exports = Title
