const React = require('react')

const Progress = () => {
  return (
    <section className='progress_container'>
      <h2 className='progress_title'>Avance del Proyecto</h2>
      <div className='progress_bar'>
        <div id='progress_percentage' className='progress_percentage' />
      </div>
    </section>
  )
}

module.exports = Progress
