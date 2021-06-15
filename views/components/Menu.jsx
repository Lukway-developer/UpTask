const React = require('react')

const Menu = ({ projects }) => {
  return (
    <aside className='menu'>
      <a className='button' href='/new-project'>Nuevo proyecto <i className='fas fa-plus' /></a>
      <h2 className='menu_title'>Proyectos</h2>
      <ul className='menu_project-list'>
        {projects.length > 0
          ? projects.map(project =>
            <li key={project.id}>
              <a
                className='menu_project-item'
                href={`/project/${project.url}`}
                title={project.name}
              >
                {project.name}
              </a>
            </li>
            )
          : <span className='menu_alert'>¡Esto esta vacio! Crea un proyecto</span>}
      </ul>
    </aside>
  )
}

module.exports = Menu
