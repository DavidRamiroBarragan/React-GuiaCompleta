import React, { useContext, useEffect } from 'react';
import AutenticationContext from '../../context/autentication/authContext';

const Barra = (props) => {
    const authContext = useContext(AutenticationContext);

    const { usuario, obtenerUsuarioAutenticado, cerrarSesion } = authContext;

    useEffect(() => {
        obtenerUsuarioAutenticado();
    }, []);

    const cerrarSesionUsuario = () => {
        cerrarSesion();
    };

    return (
        <header className='app-header'>
            <p className='nombre-usuario'>
                Hola <span>{usuario && usuario.nombre}</span>
            </p>

            <nav className='nav-principal'>
                <button
                    className='btn btn-blank cerrar-sesion'
                    onClick={cerrarSesionUsuario}>
                    Cerrar Sesión
                </button>
            </nav>
        </header>
    );
};

export default Barra;
