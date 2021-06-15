/* eslint-disable react/jsx-closing-tag-location */
const React = require('react')
const MetaData = require('./components/MetaData')

const Restore = ({ namePage, errors, token }) => {
  return (
    <html>
      <MetaData namePage={namePage} />

      <body className='login_container'>
        <main className='login_card'>
          <h1 className='login_title'>Restaurar Contraseña en <img src='/images/logo.svg' alt='UpTask Logo' /></h1>

          <form className='form' action={token ? `/restore/${token}` : '/restore'} method='post'>
            {token
              ? <>
                <label className='form_label' htmlFor='password'>Nueva Contraseña</label>
                <input className='form_input' type='password' name='password' id='password' placeholder='Nueva Contraseña' />
              </>
              : <>
                <label className='form_label' htmlFor='email'>Email</label>
                <input className='form_input' type='email' name='email' id='email' placeholder='Email' />
              </>}

            {errors
              ? <span className='alert'>{errors}</span>
              : <></>}

            <div className='button_container'>
              <div className='button_item'>
                <span className='form_label'>¿Rescordaste tu contraseña?</span>
                <a className='button-black' href='/login'>Iniciar Sesión <i className='fas fa-sign-in-alt' /></a>
              </div>
              {token
                ? <button className='button'>Restaurar Contraseña <i className='fas fa-undo-alt' /></button>
                : <button className='button' type='submit'>Verificar Email <i className='fas fa-user-check' /></button>}
            </div>

          </form>
        </main>
        <script src='/dist/bundle.js' />
      </body>
    </html>
  )
}

module.exports = Restore
