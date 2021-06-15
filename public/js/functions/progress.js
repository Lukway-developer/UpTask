import Swal from 'sweetalert2'

export const updateProgress = () => {
  const tasks = document.querySelectorAll('.task_item')

  if (tasks.length) {
    const completeTasks = document.querySelectorAll('.task_complete')
    const progressBar = document.getElementById('progress_percentage')
    const percentage = Math.round((completeTasks.length / tasks.length) * 100)

    progressBar.style.width = percentage + '%'

    if (percentage === 100) {
      Swal.fire(
        '¡Completaste el Proyecto!',
        'Felicidades, has terminado tus tareas',
        'success'
      )
    }
  }
}
