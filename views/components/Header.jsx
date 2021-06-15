const React = require('react')

const Header = () => {
  return (
    <header className='header'>
      <a className='header_logo' href='/'><img src='/images/logo.svg' /></a>
      <a className='header_button' href='/logout'>Cerrar Sesión <i className='fas fa-sign-out-alt' /></a>
    </header>
  )
}

module.exports = Header
