const { DataTypes } = require('sequelize')
const database = require('../config/db')
const Projects = require('./ProjectsModel')

const Tasks = database.define('tasks', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  task: DataTypes.STRING(100),
  state: DataTypes.BOOLEAN
}, {
  timestamps: false
})

Tasks.belongsTo(Projects, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'cascade'
})

module.exports = Tasks
