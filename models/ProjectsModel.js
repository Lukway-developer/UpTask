const { DataTypes } = require('sequelize')
const database = require('../config/db')
const slug = require('slug')
const shortid = require('shortid')

const Project = database.define('projects', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: DataTypes.STRING(100),
  url: DataTypes.STRING(100)
}, {
  timestamps: false,
  hooks: {
    beforeCreate (data) {
      const url = slug(data.name).toLowerCase()
      data.url = `${url}-${shortid.generate()}`
    }
  }
})

module.exports = Project
