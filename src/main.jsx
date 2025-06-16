import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppTambo from './AppTambo'
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <AppTambo />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
