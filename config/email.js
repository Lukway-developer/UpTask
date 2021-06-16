require('dotenv').config()
const { google } = require('googleapis')
const OAuth2 = google.auth.OAuth2

const oauth2Client = new OAuth2(
  process.env.CLIENT_ID, // ClientID
  process.env.CLIENT_SECRET, // Client Secret
  'https://developers.google.com/oauthplayground' // Redirect URL
)

oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN
})

module.exports = {
  user: 'lukway.developer@gmail.com',
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  refreshToken: process.env.REFRESH_TOKEN,
  accessToken: oauth2Client.getAccessToken()
}
