import React from 'react'
import { db, auth } from '../firebase'
import {useNavigate} from 'react-router-dom'

function Login() {

    const [modoRegistro, setModoRegistro] = React.useState(false)
    const [email, setEmail] = React.useState('')
    const [contraseña, setContraseña] = React.useState('')
    const [error, setError] = React.useState(null)

    const [exito, setExito] = React.useState(null)

    const navigate = useNavigate()

    const guardarDatos = (e) => {
        e.preventDefault()
        if (!email.trim()) {
            setError('Ingrese su email')
            return;
        }

        if (!contraseña.trim()) {
            setError('Ingrese su contraseña')
            return;
        }

        setError(null)

        if (modoRegistro) {
            registrarUsuario()
        } else {
            login()
        }

    }

    const registrarUsuario = React.useCallback(async () => {
        try {
            const respuesta = await auth.createUserWithEmailAndPassword(email, contraseña)
            console.log(respuesta.user)
            await db.collection('usuarios').doc(respuesta.user.email).set({
                email: respuesta.user.email,
                id: respuesta.user.uid
            })

            await db.collection(respuesta.user.uid).add()

            navigate('/servicio')
            window.location.reload()
            setEmail('')
            setContraseña('')
            setError(null)

            setExito('Usuario registrado con exito')

        } catch (error) {
            console.log(error)

            if (error.code === 'auth/email-already-in-use') {
                setError('La direccion de correo electronico ya se encuentra registrada')
            }

            if (error.code === 'auth/invalid-email') {
                setError('La direccion de correo electronico no es valida')
            }

            if (error.code === 'auth/weak-password') {
                setError('La contraseña debe tener minimo 6 caracteres')
            }

        }
    }, [email, contraseña])

    const login = React.useCallback(async () => {
        try {
            const respuesta = await auth.signInWithEmailAndPassword(email, contraseña)
            console.log(respuesta.user)
            
            setEmail('')
            setContraseña('')
            setError(null)
            
            navigate('/servicio')
            window.location.reload()
            
        } catch (error) {
            console.log(error)
            if (error.code === 'auth/invalid-email') {
                setError("La direccion de correo electronico no es valida")
            }

            if (error.code === 'auth/user-not-found') {
                setError("Este usuario no esta registrado")
            }

            if (error.code === 'auth/wrong-password') {
                setError("Contraseña incorrecta.")
            }
        }
    },[email,contraseña])

    return (
        <div>
            <button type='button' className='btn btn-outline-light' data-bs-toggle='modal' data-bs-target='#loginModal' title='Acceder o registrarse'><i className='bi bi-person'></i></button>

            <div className='modal fade' id='loginModal' aria-hidden='true'>
                <div className='modal-dialog'>
                    <div className='modal-content'>

                        <div className='modal-header p-5 pb-4 border-bottom-0'>
                            <h2 className='fw-bold mb-0'>
                                {modoRegistro ? 'Registrarse' : 'Iniciar sesion'}
                            </h2>
                            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                        </div>

                        <div className='modal-body p-5 pt-0'>

                            {
                                error ? <div className='alert alert-danger' role='alert'><i className='bi bi-exclamation-triangle'> {error}</i></div> : null
                            }
                            {
                                exito ? <div className='alert alert-success' role='alert'><i className='bi bi-check2-circle'> {exito}</i></div> : null
                            }

                            <form onSubmit={guardarDatos}>

                                <div className='form-floating mb-3'>
                                    <input type='email' className='form-control rounded-3' placeholder='Correo electronico' onChange={(e) => setEmail(e.target.value)} value={email} />
                                    <label htmlFor="floatingInput">Correo electronico</label>
                                </div>

                                <div className='form-floating mb-3'>
                                    <input type='password' className='form-control rounded-3' placeholder='Contraseña' onChange={(e) => setContraseña(e.target.value)} value={contraseña} />
                                    <label htmlFor="floatingInput">Contraseña</label>
                                </div>
                                <div className='d-grid gap-2'>
                                    <button className='w-100 mb-2 btn btn-lg rounded-3 btn-primary'>
                                        {modoRegistro ? 'Registrarse' : 'Ingresar'}
                                    </button>

                                    <button type='button' className='w-100 mb-2 btn btn-lg rounded-3 btn-primary' onClick={() => { setModoRegistro(!modoRegistro) }}>
                                        {modoRegistro ? 'Ya tienes una cuenta ?' : 'Aun no tienes una cuenta ?'}
                                    </button>
                                    <small className="text-muted">Al hacer clic en registrarse, acepta los términos de uso.</small>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login