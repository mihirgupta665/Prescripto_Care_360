import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import AdminContextProvider from './context/AdminContext.jsx'
import DoctorContextProvider from './context/DoctorContext.jsx'
import AppContextProvider from './context/AppContext.jsx'

// Proactively wake up backend (Render free tier) as early as possible
const wakeUpBackend = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  if (backendUrl) {
    fetch(backendUrl).catch(() => {})
  }
}
wakeUpBackend()

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AdminContextProvider>
      <DoctorContextProvider>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </DoctorContextProvider>
    </AdminContextProvider>
  </BrowserRouter>,
)
