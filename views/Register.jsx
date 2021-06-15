const React = require('react')
const MetaData = require('./components/MetaData')

const Register = ({ namePage, errors, email, password }) => {
  return (
    <html>
      <MetaData namePage={namePage} />

      <body className='login_container'>
        <main className='login_card'>
          <h1 className='login_title'>Crea tu cuenta en <img src='/images/logo.svg' alt='UpTask Logo' /></h1>

          <form className='form' action='/register' method='post'>
            <label className='form_label' htmlFor='email'>Email</label>
            <input className='form_input' type='email' name='email' id='email' defaultValue={email} placeholder='Email' />
            {errors
              ? errors.filter(error => error.path === 'email').map(error => (
                <span key={error.path} className='alert'>{error.message}</span>
                ))
              : <></>}
            {errors
              ? errors.filter(error => error.path === 'users.users_email_unique').map(error => (
                <span key={error.path} className='alert'>Este email ya esta en uso</span>
                ))
              : <></>}

            <label className='form_label second_label' htmlFor='password'>Contraseña</label>
            <input className='form_input' type='password' name='password' id='password' defaultValue={password} placeholder='Contraseña' />
            {errors
              ? errors.filter(error => error.path === 'password').map(error => (
                <span key={error.path} className='alert'>{error.message}</span>
                ))
              : <></>}

            <div className='button_container'>
              <div className='button_item'>
                <span className='form_label'>¿Ya tenes una cuenta?</span>
                <a className='button-black' href='/login'>Inicia Sesión <i className='fas fa-sign-in-alt' /></a>
              </div>
              <button className='button' type='submit'>Crear Cuenta <i className='fas fa-user-plus' /></button>
            </div>

            {/* <i class='fas fa-sign-in-alt' /> */}
          </form>
        </main>

        <script src='/dist/bundle.js' />
      </body>
    </html>
  )
}

module.exports = Register
