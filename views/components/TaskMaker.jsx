/* eslint-disable react/jsx-closing-tag-location */
const React = require('react')
const Title = require('./Title')

const TaskMaker = ({ currentProject, errors }) => {
  return (
    <section>
      <Title>{currentProject.name}</Title>

      <form className='form' action={`/project/${currentProject.url}`} method='POST'>
        <label className='form_label' htmlFor='task'>Tarea</label>
        <input
          className='form_input'
          id='task'
          name='task'
          type='text'
          placeholder='Nombre de Tarea'
          maxLength='60'
        />

        {errors
          ? errors.map(error =>
            <span className='alert' key={errors.indexOf(error)}>* {error.text}</span>
            )
          : <></>}

        <button className='button' type='submit'>
          Agregar <i className='fas fa-plus' />
        </button>
      </form>
    </section>
  )
}

module.exports = TaskMaker
