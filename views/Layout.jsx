const React = require('react')
const Header = require('./components/Header')
const MetaData = require('./components/MetaData')

const Layout = ({ namePage, children }) => {
  return (
    <html>
      <MetaData namePage={namePage} />

      <body>
        <Header />
        <div className='content'>
          {children}
        </div>
        <script src='/dist/bundle.js' />
      </body>
    </html>
  )
}

module.exports = Layout
