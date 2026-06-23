import React, { useContext } from "react"
import { AppContext } from "../context/AppContext"
import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const MyAppointments = () => {

    const { backendUrl, token, getDoctorsData } = useContext(AppContext)
    const navigate = useNavigate()

    const [appointments, setAppointments] = useState([])
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]

    const slotDateFormat = (slotDate) => {

        const dateArray = slotDate.split("_")
        // month should be -1 as index starts from 0
        return dateArray[0] + " " + month[Number(dateArray[1] - 1)] + " " + dateArray[2]

    }

    const getUserAppointments = async () => {

        try {

            const { data } = await axios.get(backendUrl + "/api/user/appointments", { headers: { token } })

            if (data.success) {
                setAppointments(data.appointments.reverse())
                console.log(data.appointments)
            }

        }
        catch (error) {
            console.log("Error Occured while reaching to the api to get the appointments. \nError : ", error)
            toast.error(error.message)
        }

    }

    useEffect(() => {

        if (token) {
            getUserAppointments()
        }
        else {
            navigate(backendUrl + "/login")
        }

    }, [token])



    const cancelAppointment = async (appointmentId) => {

        try {

            //    console.log(appointmentId) 
            if (token) {

                const { data } = await axios.post(backendUrl + "/api/user/cancel-appointment", { appointmentId }, { headers: { token } })

                if (data.success) {
                    toast.success(data.message)
                    getUserAppointments()
                    getDoctorsData()
                }
                else {
                    toast.error(data.message)
                }

            }
            else {

                toast.warn("Unauthorized! Login Again!!")
                navigate("/login")

            }
        }
        catch (error) {

            console.log("Error Occured while reaching to the API to cancel the Appointment. Error : ", error)
            toast.error(error.message)

        }

    }


    // order need to be created in backend using options
    // now window will be created using the created order received from the backend
    const initPay = (order) => {

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount*100,
            currency: order.currency,
            name: "Appoinment Payment",
            description: "Appointment Payment",
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
                // console.log(response);
                /*
                    razorpay_order_id  :"order_T4MnPoUFDFpcye"
                    razorpay_payment_id : "pay_T4Mum5HpfL6beS"
                    razorpay_signature : "9972bb0576704e541af02ec43125c65d612d7430150e9d57ccf97365e568cbd6"
                */

                try {
                
                    const {data} = await axios.post(backendUrl+"/api/user/verifyRazorpay", response, {headers: {token}} )
                    if(data.success){
                        getUserAppointments()
                        toast.success(data.message)
                        // navigate("/my-appointment")
                    }
                    else{
                        toast.error(data.message)
                    }

                }
                catch (error) {
                    
                    console.log("Error Occured while reaching the API for verification of payment. Error : ",error)
                    toast.error(error.message)

                }

            }
        }

        const rzp = new window.Razorpay(options)    // razorpayment window created
        rzp.open()  // created window opened as the popup

    }


    const appointmentRazorpay = async (appointmentId) => {

        try {

            if (token) {


                const { data } = await axios.post(backendUrl + "/api/user/payment-razorpay", { appointmentId }, { headers: { token } })

                if (data.success) {

                    // console.log(data.order);
                    initPay(data.order)

                }

            }
            else {
                toast.warn("Unauthorized to make Payment! Kindly Login Again!")
                navigate("/login")
            }

        }
        catch (error) {

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
                                {!item.cancelled && item.payment && !item.isCompleted && <button className="sm:min-w-48 py-2 border rounded text-stone-500 bg-primary text-white" disabled>Paid</button> }
                                {!item.cancelled && !item.payment && !item.isCompleted && <button onClick={() => appointmentRazorpay(item._id)} className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded border-green-500 hover:bg-green-600 hover:text-white transition-all duration-500 ">Pay Online</button>}
                                {!item.cancelled && !item.isCompleted && <button onClick={() => cancelAppointment(item._id)} className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded border-red-500 hover:bg-red-600 hover:text-white transition-all duration-500">Cancel Appointment</button>}
                                {item.cancelled && !item.isCompleted && <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500 " disabled>Appointment Cancelled</button>}
                                {item.isCompleted && <button className="sm:min-w-48 py-2 border border-primary rounded text-primary" disabled>Completed</button> }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default MyAppointments