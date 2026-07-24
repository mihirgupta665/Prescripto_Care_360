import { createContext, useEffect, useState } from "react";
import axios from "axios"
import {toast} from "react-toastify"
import {useNavigate} from "react-router-dom"

export const AdminContext = createContext()

const AdminContextProvider = (props) => {

    const navigate = useNavigate()
    const redirectToLogin = () => {
        const from = window.location.pathname + window.location.search
        navigate("/login", { state: { from } })
    }

    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : "")
    const [doctors, setDoctors] = useState([])
    const [appointments, setAppointments] = useState([])
    const [dashData, setDashData] = useState(false)
    const [doctorsLoading, setDoctorsLoading] = useState(false)
    const [appointmentsLoading, setAppointmentsLoading] = useState(false)
    const [dashLoading, setDashLoading] = useState(false)

    const backendUrl = import.meta.env.VITE_BACKEND_URL 

    useEffect(() => {
        if (!backendUrl) return

        // Keep-alive ping every 12 minutes (Render spin-down is 15 mins of inactivity)
        const interval = setInterval(() => {
            axios.get(backendUrl).catch(() => {})
        }, 12 * 60 * 1000)

        return () => clearInterval(interval)
    }, [backendUrl]) 

    const getAllDoctors = async () => {
        setDoctorsLoading(true)

        try{
            const {data} = await axios.post(backendUrl+ "/api/admin/all-doctors", {}, {headers: {aToken}})
            if (data.success) {
                setDoctors(data.doctors)
            }
            else {
                toast.error(data.message)
            }
        }
        catch(error) {
            toast.error(error.message)
        }
        finally {
            setDoctorsLoading(false)
        }

    }

    const changeAvailability = async (docId) => {

        try{

            const { data } = await axios.post(backendUrl + "/api/admin/change-availability", {docId}, {headers:{aToken}})
            if (data.success) {
                toast.success(data.message)
                getAllDoctors()
            }
            else {
                toast.error(data.message)
            }

        }
        catch(error){
            toast.error(error.message)
        }

    } 

    const getAllAppointments = async () => {
        setAppointmentsLoading(true)

        try {
            

            const { data } = await axios.get(backendUrl+"/api/admin/appointments", {headers: {aToken}})

            if(data.success){
                setAppointments(data.appointments)
                // console.log(data.appointments)
            }
            else{
                toast.error("API Unable to fetch Appointments")

            }


        }
        catch (error) {
            toast.error(error.message)
        }
        finally {
            setAppointmentsLoading(false)
        }

    }


    const cancelAppointment = async (appointmentId) => {

        try {

            const {data} = await axios.post(backendUrl+"/api/admin/cancel-appointment", {appointmentId}, {headers:{aToken}})

            if(data.success){
                toast.success(data.message)
                getAllAppointments()
            }
            else if(!data.success && data.message.includes("Not Authorized")){
                toast.warn(data.message)
                localStorage.removeItem("aToken")
                setAToken("")
                redirectToLogin()
            }
            else{
                toast.error(data.message)
            }



        }
        catch (error) {
            toast.error(error.message)
        }

    }

    const getDashData = async () => {
        setDashLoading(true)

        try {
            
            const {data} = await axios.get(backendUrl+"/api/admin/dashboard", {headers: {aToken}})

            if(data.success){
                setDashData(data.dashData)
            }
            else if(!data.success && data.message?.includes("Not Authorized")){
                toast.warn(data.message)
                localStorage.removeItem("aToken")
                setAToken("")
                redirectToLogin()
            }
            else{
                toast.error(data.message)
            }

        }
        catch (error) {
            toast.error(error.message)
        }
        finally {
            setDashLoading(false)
        }

    }

    
    const value = {
        aToken, setAToken,
        backendUrl,
        doctors, getAllDoctors,
        doctorsLoading,
        changeAvailability,
        appointments, setAppointments,
        appointmentsLoading,
        getAllAppointments, 
        cancelAppointment,
        dashData,
        dashLoading,
        getDashData, 

    }

    return(
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider> 
    )

}

export default AdminContextProvider
