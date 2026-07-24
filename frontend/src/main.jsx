import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import AppContextProvider from './context/AppContext.jsx'

// Proactively wake up backend (Render free tier) as early as possible
const wakeUpBackend = () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    if (backendUrl) {
        // Ping root to trigger spin-up
        fetch(backendUrl).catch(() => {})
        // Ping doctor list since it's the primary API call on home page load
        fetch(`${backendUrl}/api/doctor/list`).catch(() => {})
    }
}
wakeUpBackend()

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <AppContextProvider>
            <App />
        </AppContextProvider>
    </BrowserRouter>,
)

