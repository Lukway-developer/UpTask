const Users = require('../models/UsersModel')
const { Op } = require('sequelize')
const crypto = require('crypto')
const bcrypt = require('bcrypt-nodejs')
const { sendEmail } = require('../handlers/email')

exports.registerView = (req, res) => {
  res.render('Register', {
    namePage: 'Registrarse'
  })
}

exports.registerUser = async (req, res) => {
  const { email, password } = await req.body

  try {
    const user = await Users.create({
      email,
      password
    })

    const confirmUrl = `https://${req.headers.host}/confirm/${user.email}`

    await sendEmail({
      user,
      subject: 'Confirmar Cuenta en Uptask',
      url: confirmUrl,
      htmlFile: 'ConfirmAccount'
    })

    req.flash('correct', 'Enviamos un correo, confirma tu cuenta')
    res.redirect('/login')
  } catch (error) {
    req.flash('error', error.errors.map(error => error))
    res.render('Register', {
      namePage: 'Registrarse',
      errors: req.flash('error'),
      email,
      password
    })
  }
}

exports.confirmAccount = async (req, res) => {
  const email = req.params.email

  const user = await Users.findOne({
    where: {
      email
    }
  })

  user.active = 1
  await user.save()

  req.flash('correct', 'Cuenta Activada Correctamente')
  res.redirect('/login')
}

exports.loginView = (req, res) => {
  res.render('Login', {
    namePage: 'Iniciar Sesión',
    errors: req.flash('error'),
    correct: req.flash('correct')
  })
}

exports.restoreView = (req, res) => {
  res.render('Restore', {
    namePage: 'Restaurar Contraseña',
    errors: req.flash('error')
  })
}

exports.createToken = async (req, res) => {
  const { email } = req.body
  let user
  if (email) {
    user = await Users.findOne({ where: { email } })
  } else {
    console.log('Email no existe: ' + req.body)
  }

  if (!user) {
    req.flash('error', 'Este email no esta registrado')
    res.redirect('/restore')
  }

  user.token = crypto.randomBytes(20).toString('hex')
  user.expiration = Date.now() + 3600000

  await user.save()

  const resetUrl = `https://${req.headers.host}/restore/${user.token}`

  await sendEmail({
    user,
    subject: 'Recuperación de Contraseña',
    url: resetUrl,
    htmlFile: 'RestorePassword'
  })

  req.flash('correct', 'Se envío un Mensaje a tu Correo')
  res.redirect('/login')
}

exports.verifyToken = async (req, res) => {
  const token = req.params.token
  const user = await Users.findOne({ where: { token } })

  if (!user) {
    req.flash('error', 'Token no Valido')
    res.redirect('/restore')
  }

  res.render('Restore', {
    namePage: 'Restablecer Contraseña',
    errors: req.flash('error'),
    token
  })
}

exports.restorePassword = async (req, res) => {
  const { password } = req.body
  const token = req.params.token
  const user = await Users.findOne({
    where: {
      token,
      expiration: {
        [Op.gte]: Date.now()
      }

    }
  })

  if (password) {
    if (!user) {
      req.flash('error', 'Token no Valido')
      res.redirect('/restore')
    }

    user.password = user.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    user.token = null
    user.expiration = null

    await user.save()

    req.flash('correct', 'Contraseña Restablecida Correctamente')
    res.redirect('/login')
  } else {
    req.flash('error', 'Este campo no puede ir vacío')
    res.redirect(`/restore/${token}`)
  }
}
