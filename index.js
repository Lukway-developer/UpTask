const express = require('express')
const engine = require('express-react-views')
const routes = require('./routes')
const path = require('path')
const flash = require('connect-flash')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const passport = require('./config/passport')
require('dotenv').config()

const app = express()

// Set the static resource folder
app.use(express.static(path.join(__dirname, '/public')))

// Create a view engine
app.set('view engine', 'jsx')
app.set('views', path.join(__dirname, '/views'))
app.engine('jsx', engine.createEngine())

// Enable the reading of the body of a request
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

// Import Models
require('./models/ProjectsModel')
require('./models/TasksModel')
require('./models/UsersModel')

// Connection with the database
const database = require('./config/db')
database.sync()
  .then(() => console.log('Base de Datos Conectada'))
  .catch(error => console.error('No se pudo conectar con la Base de Datos:', error))

app.use(cookieParser())

// Sessions
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}))

// Passport
app.use(passport.initialize())
app.use(passport.session())

// Flash messages
app.use(flash())

// Use routes
app.use('/', routes())

const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3000

app.listen(port, host, () => {
  console.log('El servidor esta funcioando correctamente')
})
