const { DataTypes } = require('sequelize')
const database = require('../config/db')
const Projects = require('../models/ProjectsModel')
const bcrypt = require('bcrypt-nodejs')

const Users = database.define('users', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING(60),
    allowNull: false,
    validate: {
      isEmail: {
        msg: 'Agrega un Email Valido'
      },
      notEmpty: {
        msg: 'El Email no puede ir vacío'
      }
    },
    unique: {
      args: true,
      msg: 'Usuario ya Registrado'
    }
  },
  password: {
    type: DataTypes.STRING(60),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'La Contraseña no puede ir vacía'
      }
    }
  },
  active: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  token: DataTypes.STRING,
  expiration: DataTypes.DATE
}, {
  timestamps: false,
  hooks: {
    beforeCreate (user) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10))
    }
  }
})

// Métodos Personalizados
Users.prototype.checkPassword = (password, dbPassword) => {
  return bcrypt.compareSync(password, dbPassword)
}

Users.hasMany(Projects)

module.exports = Users
