const { Sequelize } = require('sequelize')
require('dotenv').config()
const database = new Sequelize(
  process.env.BD_NAME,
  process.env.BD_USER,
  process.env.BD_PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql',
    port: '3306'
  })

module.exports = database
