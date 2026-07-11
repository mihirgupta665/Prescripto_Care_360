import { createContext, useState } from "react";
import { toast } from "react-toastify"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const DoctorContext = createContext()

const DoctorContextProvider = (props) => {

    const navigate = useNavigate()
    const redirectToLogin = () => {
        const from = window.location.pathname + window.location.search
        navigate("/login", { state: { from } })
    }

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [dToken, setDToken] = useState(localStorage.getItem("dToken") ? localStorage.getItem("dToken") : "")
    const [appointments, setAppointments] = useState([])
    const [dashData, setDashData] = useState(false)
    const [profileData, setProfileData] = useState(false)
    const [appointmentsLoading, setAppointmentsLoading] = useState(false)
    const [dashLoading, setDashLoading] = useState(false)
    const [profileLoading, setProfileLoading] = useState(false)

    const getAppointments = async () => {
        setAppointmentsLoading(true)

        try {

            const { data } = await axios.get(backendUrl + "/api/doctor/appointments", { headers: { dToken } })

            if (data.success) {
                setAppointments(data.appointments.reverse())
            }
            else {
                toast.error(data.message)
            }

        }
        catch (error) {
            toast.error(error.message)
        }
        finally {
            setAppointmentsLoading(false)
        }

    }


    const completeAppointment = async (appointmentId) => {

        try {

            const { data } = await axios.post(backendUrl + "/api/doctor/complete-appointment", { appointmentId }, { headers: { dToken } })

            if (data.success) {
                toast.success(data.message)
                getAppointments()
            }
            else if (data.message.includes("Not Authorized")) {
                toast.warn(data.message)
                redirectToLogin()
            }
            else {
                toast.error(data.message)
            }

        }
        catch (error){
            toast.error(error.message)
        }
        
    }


    const cancelAppointment = async (appointmentId) => {

        try {

            const { data } = await axios.post(backendUrl + "/api/doctor/cancel-appointment", { appointmentId }, { headers: { dToken } })

            if (data.success) {
                toast.success(data.message)
                getAppointments()
            }
            else if (data.message.includes("Not Authorized")) {
                toast.warn(data.message)
                redirectToLogin()
            }
            else {
                toast.error(data.message)
            }

        }
        catch (error){
            toast.error(error.message)
        }
        
    }


    const getDashData = async () => {
        setDashLoading(true)

        try {
         
            const {data} = await axios.get(backendUrl+"/api/doctor/dashboard", {headers: {dToken}})

            if(data.success){
                setDashData(data.dashData)
            }
            else if(data.message.includes("Not Authorized")){
                setDToken("")
                localStorage.removeItem("dToken")
                toast.warn(data.message)
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


    const getProfileData = async () => {
        setProfileLoading(true)

        try {
            
            const {data} = await axios.get(backendUrl+"/api/doctor/profile", {headers: {dToken}})

            if(data.success){
                setProfileData(data.profileData)
            }
            else if(data.message.includes("Not Authorized")){
                setDToken("")
                localStorage.removeItem("dToken")
                toast.warn(data.message)
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
            setProfileLoading(false)
        }


    }


    const value = {
        dToken, setDToken,
        backendUrl,
        appointments, setAppointments,
        appointmentsLoading,
        getAppointments,
        completeAppointment,
        cancelAppointment,
        dashData, setDashData,
        dashLoading,
        getDashData,
        profileData, setProfileData,
        profileLoading,
        getProfileData,
        

        

    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>

    )

}

export default DoctorContextProvider
