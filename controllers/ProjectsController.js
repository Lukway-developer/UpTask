const Projects = require('../models/ProjectsModel')
const Tasks = require('../models/TasksModel')

exports.home = async (req, res) => {
  const userId = req.user.id
  const projects = await Projects.findAll({ where: { userId } })

  const pendingTasks = await Tasks.findAll({
    where: {
      state: 0,
      projectId: projects.map(project => project.id)
    }
  })

  res.render('Home', {
    namePage: 'Home',
    projects,
    pendingTasks
  })
}

exports.newProject = async (req, res) => {
  const userId = req.user.id
  const projects = await Projects.findAll({ where: { userId } })

  res.render('NewProject', {
    namePage: 'New Project',
    projects
  })
}

exports.createNewProject = async (req, res) => {
  const { projectName } = req.body
  const errors = []
  const userId = req.user.id
  const projects = await Projects.findAll({ where: { userId } })

  if (!projectName) {
    errors.push({ text: 'Agregue un Nombre' })
  }

  if (errors.length > 0) {
    res.render('NewProject', {
      namePage: projectName,
      projects,
      errors
    })
  } else {
    const userId = req.user.id

    const project = await Projects.create({
      name: projectName,
      userId
    })
    res.redirect(`/project/${project.url}`)
  }
}

exports.existentProject = async (req, res) => {
  const userId = req.user.id
  const projectsPromise = await Projects.findAll({ where: { userId } })

  const currentProjectPromise = Projects.findOne({ where: { url: req.params.url } })

  const [projects, currentProject] = await Promise.all([projectsPromise, currentProjectPromise])

  if (projects && currentProject) {
    const tasks = await Tasks.findAll({
      where: { projectId: currentProject.id },
      include: [{
        model: Projects
      }]
    })

    res.render('ExistentProject', {
      namePage: currentProject.name,
      url: currentProject.url,
      projects,
      currentProject,
      tasks
    })
  }
}

exports.editProject = async (req, res) => {
  const userId = req.user.id
  const projectsPromise = await Projects.findAll({ where: { userId } })

  const currentProjectPromise = Projects.findOne({ where: { id: req.params.id } })

  const [projects, currentProject] = await Promise.all([projectsPromise, currentProjectPromise])

  if (projects && currentProject) {
    res.render('NewProject', {
      namePage: `Editar Proyecto: ${currentProject.name}`,
      url: currentProject.url,
      projects,
      currentProject
    })
  }
}

exports.updateProject = async (req, res) => {
  const { projectName } = req.body
  const errors = []
  const userId = req.user.id
  const projectsPromise = await Projects.findAll({ where: { userId } })
  const currentProjectPromise = Projects.findOne({ where: { id: req.params.id } })

  const [projects, currentProject] = await Promise.all([projectsPromise, currentProjectPromise])

  if (projects && currentProject) {
    if (!projectName) {
      errors.push({ text: 'Agregue un Nombre' })
    }

    if (errors.length > 0) {
      res.render('NewProject', {
        namePage: `Editar Proyecto: ${currentProject.name}`,
        url: currentProject.url,
        projects,
        currentProject,
        errors
      })
    } else {
      await Projects.update(
        { name: projectName },
        { where: { id: req.params.id } }
      )
      const project = await Projects.findOne({ where: { id: req.params.id } })

      res.redirect(`/project/${project.url}`)
    }
  }
}

exports.deleteProject = async (req, res, next) => {
  const { urlProject } = req.query

  const result = await Projects.destroy({ where: { url: urlProject } })

  if (!result) {
    return next()
  }

  res.send('Proyecto Eliminado Correctamente')
}
