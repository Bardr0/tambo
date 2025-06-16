import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRouter = () => {
    // Validar el usuario
    const isLogged = true;
    if (!isLogged) return <Navigate to={'/login'} />
    return (
        <Outlet />
    )
}

export default PrivateRouter