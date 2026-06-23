import { useContext, createContext, useState } from "react";
import { toast } from "react-toastify"
import axios from "axios"
import { useNavigate } from "react-router-dom"


export const DoctorContext = createContext()

const DoctorContextProvider = (props) => {

    const navigate = useNavigate()

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [dToken, setDToken] = useState(localStorage.getItem("dToken") ? localStorage.getItem("dToken") : "")
    const [appointments, setAppointments] = useState([])
    const [dashData, setDashData] = useState(false)

    const getAppointments = async () => {

        try {

            const { data } = await axios.get(backendUrl + "/api/doctor/appointments", { headers: { dToken } })

            if (data.success) {
                setAppointments(data.appointments.reverse())
                console.log(data.appointments)
            }
            else {
                toast.error(data.message)
            }

        }
        catch (error) {
            console.log("Error Occured while reaching to the API to get all the appointments of the doctor. Error : ", error)
            toast.error(error.message)
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
                navigate("/")
            }
            else {
                toast.error(data.message)
            }

        }
        catch (error){
            console.log("Error occured while reaching the API to complete the Appointment. Error : ",error)
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
                navigate("/")
            }
            else {
                toast.error(data.message)
            }

        }
        catch (error){
            console.log("Error occured while reaching the API to cancel the Appointment. Error : ",error)
            toast.error(error.message)
        }
        
    }


    const getDashData = async () => {

        try {
         
            const {data} = axios.get(backendUrl+"/api/doctor/dashboard", {headers: {dToken}})

            if(data.success){
                setDashData(data.dashData)
            }
            else if(data.message.includes("Not Authorized")){
                setDToken(" ")
                localStorage.removeItem(dToken)
                toast.warn(data.message)
                navigate("/")
            }
            else{
                toast.error(data.message)
            }

        }
        catch (error) {
            
            console.log("Error occured while reaching to the API to get the data for the dashboard data. Error : ",error)
            toast.error(error.message)

        }

    }


    const value = {
        dToken, setDToken,
        backendUrl,
        appointments, setAppointments,
        getAppointments,
        completeAppointment,
        cancelAppointment,
        dashData, setDashData,
        getDashData,
        
        

    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>

    )

}

export default DoctorContextProvider