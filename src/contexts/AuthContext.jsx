import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [contador, setContador] = useState(0);

    //login

    //longout

    //verificarlogin 

    //info

    const incrementar = () => {
        setContador(contador => contador + 1)
    }
    const decrementar = () => {
        setContador(contador => contador - 1)
    }
    const reiniciar = () => {
        setContador(0);
    }

    return <AuthContext.Provider value={{
        incrementar,
        decrementar,
        reiniciar,
        contador
    }}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);