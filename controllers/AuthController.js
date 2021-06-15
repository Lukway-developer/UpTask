const passport = require('passport')

exports.loginUser = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
  badRequestMessage: 'Ambos campos son obligatorios'
})

exports.verifyLoginUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }

  return res.redirect('/login')
}

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
}
