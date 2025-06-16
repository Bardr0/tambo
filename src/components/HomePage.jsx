import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
    return (
        <>
            <Link to={'/login'}>Ir a login</Link>
            <br />
            <Link to={'/about'}>Ir a About</Link>
        </>
    )
}

export default HomePage