const Projects = require('../models/ProjectsModel')
const Tasks = require('../models/TasksModel')

exports.addTask = async (req, res, next) => {
  const { task } = req.body
  const state = 0
  let projectId
  let result
  const errors = []
  const userId = req.user.id
  const projects = await Projects.findAll({ where: { userId } })
  const currentProject = await Projects.findOne({ where: { url: req.params.url } })
  const tasks = await Tasks.findAll({ where: { projectId: currentProject.id } })

  if (!task) {
    errors.push({ text: 'Agregue una Tarea' })
  }

  if (errors.length > 0) {
    res.render('ExistentProject', {
      namePage: currentProject.name,
      url: currentProject.url,
      projects,
      currentProject,
      tasks,
      errors
    })
  } else {
    projectId = currentProject.id
    result = await Tasks.create({ task, state, projectId })

    if (!result) {
      return next()
    }

    res.redirect(`/project/${req.params.url}`)
  }
}

exports.updateStateTask = async (req, res, next) => {
  const { id } = req.params
  const task = await Tasks.findOne({ where: { id } })

  let state = false
  if (task.state === state) {
    state = true
  }
  task.state = state

  const result = await task.save()

  if (!result) {
    return next()
  }

  res.send('Actualizado')
}

exports.deleteTask = async (req, res, next) => {
  const { id } = req.params
  const result = await Tasks.destroy({ where: { id } })

  if (!result) {
    return next()
  }

  res.send('Tarea Eliminada Correctamente')
}
