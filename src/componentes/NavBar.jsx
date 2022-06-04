import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Routes
} from "react-router-dom";
import Login from './Loging';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

function NavBar(props) {

    const navigate = useNavigate()

    const cerrarSesion = () => {
        auth.signOut()
            .then(() => {
                navigate('/inicio')
            })
    }

    return (
        <div>
            <nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
                <div className='container-fluid'>
                    <span className='navbar-brand h1'>
                    <h1 align="center"> Torres Industry </h1>
                    </span>
                    <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNav' aria-controls="navbarNav" aria-expanded='false' aria-label='Toggle navigation'>
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div className='collapse navbar-collapse justify-content-end' id='navbarNav'>
                        <ul className='navbar-nav'>
                            <li className='nav-item'><Link to='/' className='nav-link'>Inicio</Link></li>
                            <li className='nav-item'>
                                {
                                    props.firebaseUser !== null ? (<Link to='/servicio' className='nav-link'>Servicio</Link>) : null
                                }
                            </li>
                            <li className='nav-item ms-2'>

                                {
                                    props.firebaseUser !== null ? (<button className='btn btn-outline-light' onClick={() => cerrarSesion()}><i className='bi bi-box-arrow-right'></i></button>)
                                        :
                                        (<Login></Login>)
                                }
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar