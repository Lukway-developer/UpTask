const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const Users = require('../models/UsersModel')

passport.use(
  new LocalStrategy(
    // For default, passport await an user and a password
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    async (req, email, password, done) => {
      try {
        const user = await Users.findOne({
          where: { email, active: 1 }
        })
        if (!user.checkPassword(password, user.password)) {
          // Email exists, but password is incorrect
          return done(null, false, req.flash('error', 'La contraseña es incorrecta'))
          // return done(null, false, {
          //   message: 'Contraseña Incorrecta'
          // })
        }
        // Email exists and Password is correct
        return done(null, user)
      } catch (error) {
        return done(null, false, req.flash('error', 'Este email no esta registrado'))
        // return done(null, false, {
        //   message: 'Email no Registrado'
        // })
      }
    }
  )
)

passport.serializeUser((user, callback) => {
  callback(null, user)
})

passport.deserializeUser((user, callback) => {
  callback(null, user)
})

module.exports = passport
