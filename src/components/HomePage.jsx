import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const HomePage = () => {
    const {incrementar, decrementar, reiniciar, contador} = useAuth();
    return (
        <>
            <h4>Contador :{contador} </h4>
            <button type='button' disabled={contador == 0} onclick = {decrementar}>Decrementar</button>
            <button type='button' disabled={contador == 0} onclick = {reiniciar}>Reinicar</button>
            <button type='button' onclick = {incrementar}>Incrementar</button>
        </>
    )
}

export default HomePage