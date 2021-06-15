const React = require('react')

const MetaData = ({ namePage }) => {
  return (
    <head>
      <meta httpEquiv='Content-Type' content='text/html;charset=UTF-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <meta httpEquiv='X-UA-Compatible' content='ie=edge' />

      <title>{namePage}</title>
      <link rel='shortcut icon' href='/images/icon.svg' type='image/x-icon' />
      <link rel='stylesheet' href='/css/index.css' />

      {/* Font Awesome */}
      <script src='https://kit.fontawesome.com/324d384509.js' crossOrigin='anonymous' />

      {/* Google Fonts  */}
      <link rel='preconnect' href='https://fonts.gstatic.com' />
      <link href='https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap' rel='stylesheet' />
    </head>
  )
}

module.exports = MetaData
