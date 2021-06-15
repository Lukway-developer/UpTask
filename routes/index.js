const express = require('express')
const router = express.Router()
const ProjectsController = require('../controllers/ProjectsController')
const TasksController = require('../controllers/TasksController')
const UsersController = require('../controllers/UsersController')
const AuthController = require('../controllers/AuthController')

const Router = () => {
  // Projects
  router.get('/',
    AuthController.verifyLoginUser,
    ProjectsController.home
  )

  router.get('/new-project',
    AuthController.verifyLoginUser,
    ProjectsController.newProject
  )
  router.post('/new-project',
    AuthController.verifyLoginUser,
    ProjectsController.createNewProject
  )

  router.get('/project/:url',
    AuthController.verifyLoginUser,
    ProjectsController.existentProject
  )

  router.get('/project/edit/:id',
    AuthController.verifyLoginUser,
    ProjectsController.editProject
  )
  router.post('/project/edit/:id',
    AuthController.verifyLoginUser,
    ProjectsController.updateProject
  )

  router.delete('/project/:url',
    AuthController.verifyLoginUser,
    ProjectsController.deleteProject
  )

  // Tasks
  router.post('/project/:url',
    AuthController.verifyLoginUser,
    TasksController.addTask
  )

  router.patch('/task/:id',
    AuthController.verifyLoginUser,
    TasksController.updateStateTask
  )
  router.delete('/task/:id',
    AuthController.verifyLoginUser,
    TasksController.deleteTask
  )

  // Users
  router.get('/register', UsersController.registerView)
  router.post('/register', UsersController.registerUser)
  router.get('/confirm/:email', UsersController.confirmAccount)

  router.get('/login', UsersController.loginView)

  // Auth
  router.post('/login', AuthController.loginUser)
  router.get('/logout', AuthController.logout)

  router.get('/restore', UsersController.restoreView)
  router.post('/restore', UsersController.createToken)
  router.get('/restore/:token', UsersController.verifyToken)
  router.post('/restore/:token', UsersController.restorePassword)

  return router
}

module.exports = Router
