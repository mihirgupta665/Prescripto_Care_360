import React, { useContext, lazy, Suspense } from "react"
import Login from "./pages/Login"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { AdminContext } from "./context/AdminContext"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import { Route, Routes } from "react-router-dom"
import ScrollToTop from "./components/ScrollToTop"
import { DoctorContext } from "./context/DoctorContext"
import LoadingState from "./components/LoadingState"

const Dashboard = lazy(() => import("./pages/Admin/Dashboard"))
const AllAppointments = lazy(() => import("./pages/Admin/AllAppointments"))
const AddDoctor = lazy(() => import("./pages/Admin/AddDoctor"))
const DoctorsList = lazy(() => import("./pages/Admin/DoctorsList"))
const PanelHome = lazy(() => import("./pages/PanelHome"))
const NotFound = lazy(() => import("./pages/NotFound"))
const DoctorDashboard = lazy(() => import("./pages/Doctor/DoctorDashboard"))
const DoctorAppointments = lazy(() => import("./pages/Doctor/DoctorAppointments"))
const DoctorProfile = lazy(() => import("./pages/Doctor/DoctorProfile"))

const App = () => {

    const {aToken} = useContext(AdminContext)
    const {dToken} = useContext(DoctorContext)

    return aToken || dToken
    ? (
        <div className="bg-[#F8F9FD]">
            <ScrollToTop />
            <ToastContainer />
            <Navbar />
            <div className="flex items-start">
                <Sidebar />
                <Suspense fallback={
                    <div className="w-full min-h-[60vh] flex items-center justify-center p-6">
                        <LoadingState
                            title="Loading panel"
                            message="Please wait while we prepare the dashboard view."
                            variant="cards"
                        />
                    </div>
                }>
                    <Routes>

                        {/* Admin Routes */}
                        <Route path="/" element={<PanelHome />} />
                        <Route path="/admin-dashboard" element={<Dashboard />} />
                        <Route path="/all-appointments" element={<AllAppointments />} />
                        <Route path="/add-doctor" element={<AddDoctor />} />
                        <Route path="/doctor-list" element={<DoctorsList />} />

                        {/* Doctor Routes */}
                        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
                        <Route path="/doctor-appointments" element={<DoctorAppointments />} />
                        <Route path="/doctor-profile" element={<DoctorProfile />} />
                        <Route path="*" element={<NotFound />} />
                        
                    </Routes>
                </Suspense>
            </div>
            
        </div>
    ) 
    : (
        <>
            <ScrollToTop />
            <Login />
            <ToastContainer />
        </>
    )
}

export default App

