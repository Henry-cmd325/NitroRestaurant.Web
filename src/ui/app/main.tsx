import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import "reflect-metadata"; //habilitando decoradores para DI


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)