/* eslint-disable react/jsx-closing-tag-location */
const React = require('react')
const Title = require('./Title')

const Form = ({ currentProject = {}, errors }) => {
  let title = 'Nuevo Proyecto'
  let label = 'Nombre del Proyecto'
  let action = '/new-project'
  let inputValue = ''
  let placeholder = 'Nombre del Projecto'

  if (currentProject.url) {
    title = 'Editar'
    label = 'Editar el Proyecto'
    action = `/project/edit/${currentProject.id}`
    inputValue = currentProject.name
    placeholder = 'Editar el Proyecto'
  }

  return (
    <main className='form_container'>
      <Title>{title}</Title>

      <form className='form' action={action} method='POST'>
        <label className='form_label' htmlFor='projectName'>{label}</label>
        <input
          className='form_input'
          id='projectName'
          name='projectName'
          type='text'
          defaultValue={inputValue}
          placeholder={placeholder}
          maxLength='60'
        />

        {errors
          ? errors.map(error =>
            <span className='alert' key={errors.indexOf(error)}>* {error.text}</span>
            )
          : <></>}

        {currentProject.url
          ? <button className='button' type='submit'>
            Guardar <i className='fas fa-save' />
          </button>
          : <button className='button' type='submit'>
            Agregar <i className='fas fa-plus' />
          </button>}
      </form>
    </main>
  )
}

module.exports = Form
