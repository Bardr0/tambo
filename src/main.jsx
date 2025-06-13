import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppTambo from './AppTambo'
 
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppTambo />
  </StrictMode>,
)
