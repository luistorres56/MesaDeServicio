import React from 'react'
import { auth, db } from '../firebase'
import { useNavigate } from 'react-router-dom'
import Registrar from './Registrar'

function Servicio() {
    const navigate = useNavigate()
    const [user, setUser] = React.useState(null)

    React.useEffect(() => {
        if (auth.currentUser) {
            // console.log('Usuario existe')
            setUser(auth.currentUser)
        } else {
            // console.log('Usuario no existe')
            navigate('/inicio')
        }
    }, [navigate])

    return (
        <div className='container mt-2'>
            <h1>Servicios</h1>
            {
                user &&
                // <h4>Bienvenido usuario, {user.email}</h4>
                <Registrar user={user}></Registrar>
            }
        </div>
    )
}

export default Servicio