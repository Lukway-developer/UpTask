const React = require('react')
const Title = require('./Title')

const Welcome = ({ projects, pendingTasks }) => {
  return (
    <main className='welcome'>
      <Title>Bienvenido</Title>

      <div className='welcome_items_container'>
        <div className='welcome_item'>
          <h3 className='welcome_caption'>Tareas Pendientes</h3>
          <span className='welcome_number'>{pendingTasks.length}</span>
        </div>

        <div className='welcome_item'>
          <h3 className='welcome_caption'>N° de Proyectos</h3>
          <span className='welcome_number'>{projects.length}</span>
        </div>
      </div>
    </main>
  )
}

module.exports = Welcome
