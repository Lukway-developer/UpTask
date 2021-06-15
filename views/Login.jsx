const React = require('react')
const MetaData = require('./components/MetaData')

const Login = ({ namePage, errors, correct }) => {
  return (
    <html>
      <MetaData namePage={namePage} />

      <body className='login_container'>
        <main className='login_card'>
          <h1 className='login_title'>Inicia Sesión en <img src='/images/logo.svg' alt='UpTask Logo' /></h1>
          {errors
            ? errors.map(error => (
              <span key={error} className='alert-login'>{error}</span>
              ))
            : <></>}
          {correct
            ? <span className='correct-login'>{correct}</span>
            : <></>}

          <form className='form' action='/login' method='post'>
            <label className='form_label' htmlFor='email'>Email</label>
            <input className='form_input' type='email' name='email' id='email' placeholder='Email' />

            <label className='form_label second_label' htmlFor='password'>Contraseña</label>
            <input className='form_input' type='password' name='password' id='password' placeholder='Contraseña' />

            <div className='button_container'>
              <div className='button_item'>
                <span className='form_label'>¿No tenes una cuenta?</span>
                <a className='button-black' href='/register'>Registrarse <i className='fas fa-user-plus' /></a>
              </div>
              <div className='button_item'>
                <a className='form_label-link' href='/restore'>¿Te olvidaste tu contraseña?</a>
                <button className='button' type='submit'>Iniciar Sesión <i className='fas fa-sign-in-alt' /></button>
              </div>
            </div>

          </form>
        </main>

        <script src='/dist/bundle.js' />
      </body>
    </html>
  )
}

module.exports = Login
