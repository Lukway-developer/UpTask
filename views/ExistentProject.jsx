const React = require('react')
const Layout = require('./Layout')
const Menu = require('./components/Menu')
const TaskMaker = require('./components/TaskMaker')
const TasksContainer = require('./components/TasksContainer')
const Progress = require('./components/Progress')

const ExistentProject = ({ namePage, projects, currentProject, tasks, errors }) => {
  return (
    <Layout namePage={namePage}>
      <Menu projects={projects} />
      <div className='main_content'>
        <TaskMaker currentProject={currentProject} errors={errors} />

        <TasksContainer tasks={tasks} />

        <Progress />

        <section className='button_container'>
          <a className='button' href={`/project/edit/${currentProject.id}`}>Editar Proyecto <i className='fas fa-edit' /></a>
          <button className='button-red' id='buttonDeleteProject' data-project-url={currentProject.url}>Eliminar Proyecto <i className='fas fa-trash-alt' /></button>
        </section>
      </div>
    </Layout>
  )
}

module.exports = ExistentProject
