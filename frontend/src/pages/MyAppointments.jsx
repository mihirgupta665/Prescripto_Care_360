import React, { useContext } from "react"
import {AppContext} from "../context/AppContext"
import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { useEffect } from "react"
import {useNavigate} from "react-router-dom"

const MyAppointments = () => {

    const { backendUrl, token } = useContext(AppContext)
    const navigate = useNavigate()

    const [appointments, setAppointments ] = useState([])
    const month = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec" ]

    const slotDateFormat = (slotDate) => {

        const dateArray = slotDate.split("_")
        // month should be -1 as index starts from 0
        return dateArray[0]+" "+month[Number(dateArray[1] -1)]+" "+dateArray[2]

    }

    const getUserAppointments = async() => {

        try {
            
            const {data} = await axios.get(backendUrl+"/api/user/appointments", {headers:{token}})
            
            if(data.success){
                setAppointments(data.appointments.reverse())
                console.log(data.appointments)
            }

        }
        catch (error) {
            console.log("Error Occured while reaching to the api to get the appointments. \nError : ",error)
            toast.error(error.message)
        }

    }

    useEffect( () => {

        if(token) {
            getUserAppointments()
        }
        else {
            navigate(backendUrl+"/login")
        }

    }, [token])



    const cancelAppointment = async (appointmentId) => {

        try {
           
            //    console.log(appointmentId) 
            if (token){

                const {data} = await axios.post(backendUrl+"/api/user/cancel-appointment", {appointmentId}, {headers:{token}})

                if(data.success){
                    toast.success(data.message)
                    getUserAppointment()

                }
                else{
                    toast.error(data.message)
                }

            }
            else{

                toast.warn("Unauthorized! Login Again!!")
                navigate("/login")

            }
        }
        catch (error) {
            
            console.log("Error Occured while reaching to the API to cancel the Appointment. Error : ",error)
            toast.error(error.message)

        }

    }

    return (
        <div>
            <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">My Appointments</p>
            <div >
                {
                    appointments.map((item, index) => (
                        <div className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 mt-10 py-2 border-b" key={index}>
                            <div>
                                <img className="w-32 bg-indigo-50" src={item.docData.image} alt="" />
                            </div>
                            <div className="flex-1 text-sm text-zinc-600">
                                <p className="text-neutral-800 font-semibold">{item.docData.name}</p>
                                <p>{item.docData.speciality}</p>
                                <p className="text-zinc-700 font-medium mt-1">Address : </p>
                                <p className="text-sm">{item.docData.address.line1}</p>
                                <p className="text-sm">{item.docData.address.line2}</p>
                                <p className="text-sm mt-1"><span className="text-sm text-neutral-700 font-medium">Date & Time : </span> {slotDateFormat(item.slotDate)} | {item.slotTime} </p>
                            </div>
                            <div></div>
                            <div className="flex flex-col gap-2 justify-end">
                                <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded border-green-500 hover:bg-green-600 hover:text-white transition-all duration-500 ">Pay Online</button>
                                <button onClick={() => cancelAppointment(item._id) } className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded border-red-500 hover:bg-red-600 hover:text-white transition-all duration-500">Cancek Appointment</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default MyAppointments