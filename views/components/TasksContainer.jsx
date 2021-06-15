/* eslint-disable react/jsx-indent */
const React = require('react')

const TasksContainer = ({ tasks }) => {
  return (
    <section className='task_container'>
      {tasks.length > 0
        ? <>
            <span className='task_caption'>Tareas</span>

            <ul id='task_list' className='task_list'>
              {tasks.map(task => (
                <li key={task.id} className='task_item' data-task={task.id}>
                  {task.task}

                  <div className='task_icons'>
                    {task.state
                      ? <i className='fas fa-check-circle task_complete' />
                      : <i className='fas fa-check-circle' />}
                    <i className='fas fa-trash-alt' />
                  </div>
                </li>
              ))}
            </ul>
          </>
        : <>
            <span className='task_caption'>Tareas</span>
            <span className='alert'>No hay tareas en este proyecto</span>
          </>}
    </section>
  )
}

module.exports = TasksContainer
