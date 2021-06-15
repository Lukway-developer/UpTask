import axios from 'axios'
import Swal from 'sweetalert2'

const buttonDeleteProject = document.getElementById('buttonDeleteProject')

if (buttonDeleteProject) {
  buttonDeleteProject.addEventListener('click', (e) => {
    const urlProject = e.target.dataset.projectUrl
    Swal.fire({
      title: '¿Deseas borrar este proyecto?',
      text: 'Un proyecto eliminado no se puede recuperar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#289672',
      cancelButtonColor: '#F13950',
      confirmButtonText: 'Si, borrar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      // Send delete request
      if (result.isConfirmed) {
        const url = `${window.location.origin}/project/${urlProject}`

        axios.delete(url, { params: { urlProject } })
          .then(res => {
            Swal.fire(
              '¡Proyecto Eliminado!',
              res.data,
              'success'
            )
            setTimeout(() => { window.location.href = '/' }, 2000)
          })
          .catch(() => {
            Swal.fire({
              type: 'error',
              title: 'Hubo un error',
              text: 'No se pudo eliminar el Proyecto'
            })
          })
      }
    })
  })
}
