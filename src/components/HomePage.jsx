import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const HomePage = () => {
    const { incrementar, decrementar, reiniciar, contador } = useAuth();
    return (
        <>
            <h4>Contador :{contador} </h4>
            <button type='button' disabled={contador == 0} onClick={decrementar}>Decrementar</button>
            <button type='button' disabled={contador == 0} onClick={reiniciar}>Reinicar</button>
            <button type='button' onClick={incrementar}>Incrementar</button>
        </>
    )
}

export default HomePage