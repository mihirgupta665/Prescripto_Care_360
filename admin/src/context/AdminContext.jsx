import { createContext, useState } from "react";
import axios from "axios"
import {toast} from "react-toastify"
import {useNavigate} from "react-router-dom"

export const AdminContext = createContext()

const navigate = useNavigate()

const AdminContextProvider = (props) => {

    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : "")
    const [doctors, setDoctors] = useState([])
    const [appointments, setAppointments] = useState([])

    const backendUrl = import.meta.env.VITE_BACKEND_URL 

    const getAllDoctors = async () => {

        try{
            const {data} = await axios.post(backendUrl+ "/api/admin/all-doctors", {}, {headers: {aToken}})
            if (data.success) {
                setDoctors(data.doctors)
                console.log("All doctors from admin context : ",data.doctors)
            }
            else {
                toast.error(data.message)
            }
        }
        catch(error) {
            toast.error(error.message)
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

        try {
            

            const { data } = await axios.get(backendUrl+"/api/admin/appointments", {headers: {aToken}})

            if(data.success){
                setAppointments(data.appointments)
                console.log(data.appointments)
            }
            else{
                toast.error("API Unable to fetch Appointments")

            }


        }
        catch (error) {
            console.log("Error Occured while reaching to to API for getting all appointments. Error : ",error)
            toast.error(error.message)
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
                navigate("/login")
            }
            else{
                toast.error(data.message)
            }



        }
        catch (error) {
            
        }

    }

    
    const value = {
        aToken, setAToken,
        backendUrl,
        doctors, getAllDoctors,
        changeAvailability,
        appointments, setAppointments,
        getAllAppointments, 
        cancelAppointment,

    }

    return(
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider> 
    )

}

export default AdminContextProvider
