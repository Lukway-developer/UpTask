import axios from 'axios'
import Swal from 'sweetalert2'
import { updateProgress } from '../functions/progress'

const tasksList = document.getElementById('task_list')

if (tasksList) {
  tasksList.addEventListener('click', e => {
    const icon = e.target
    const idTask = icon.parentElement.parentElement.dataset.task
    const url = `${window.location.origin}/task/${idTask}`

    if (e.target.classList.contains('fa-check-circle')) {
      axios.patch(url, { idTask })
        .then(res => {
          if (res.status === 200) {
            icon.classList.toggle('task_complete')
            updateProgress()
          }
        })
    }

    if (e.target.classList.contains('fa-trash-alt')) {
      const taskHTML = e.target.parentElement.parentElement

      Swal.fire({
        title: '¿Deseas borrar esta tarea?',
        text: 'Una tarea eliminada no se puede recuperar',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#289672',
        cancelButtonColor: '#F13950',
        confirmButtonText: 'Si, borrar',
        cancelButtonText: 'Cancelar'
      }).then(result => {
        // Send delete request
        if (result.isConfirmed) {
          axios.delete(url, { params: { idTask } })
            .then(res => {
              taskHTML.parentElement.removeChild(taskHTML)
              Swal.fire(
                '¡Tarea Eliminado!',
                res.data,
                'success'
              )
              updateProgress()
            })
            .catch(() => {
              Swal.fire({
                type: 'error',
                title: 'Hubo un error',
                text: 'No se pudo eliminar la Tarea'
              })
            })
        }
      })

      // axios.delete(url, { params:  })
      //   .then(res => {
      //     if (res.status === 200) {
      //       icon.classList.toggle('task_complete')
      //     }
      //   })
    }
  })
}

export default tasksList
