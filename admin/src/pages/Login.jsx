import React, { useContext, useState } from "react"
import axios from "axios" 
import { toast } from "react-toastify"
import { AdminContext } from "../context/AdminContext"
import { DoctorContext } from "../context/DoctorContext"
import { useLocation, useNavigate } from "react-router-dom"

const Login = () => {

    const navigate = useNavigate()
    const location = useLocation()

    const {setAToken, backendUrl} = useContext(AdminContext)
    const {setDToken} = useContext(DoctorContext)
    const redirectTo = location.state?.from || (location.pathname !== "/login" ? location.pathname : "")


    const [state, setState] = useState("Admin")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const onSubmitHandler = async (event) => {

        event.preventDefault()

        try{

            if(state === "Admin"){

                const {data} = await axios.post(backendUrl + "/api/admin/login", {email, password})
                if(data.success) {
                    localStorage.setItem("aToken", data.token)
                    setAToken(data.token); 
                    toast.success("Admin login successful \nWelcome onboard!")
                    navigate(redirectTo || "/admin-dashboard", { replace: true })
                }
                else{
                    toast.error(data.message)
                }

            }

            else{

                const {data} = await axios.post(backendUrl+"/api/doctor/login", {email, password} )

                if(data.success){
                    localStorage.setItem("dToken", data.token)
                    setDToken(data.token)
                    toast.success("Doctor login successful \nWelcome onboard!")
                    navigate(redirectTo || "/doctor-dashboard", { replace: true })
                }
                else{
                    toast.error(data.message)
                }

            }

        }
        catch(error){
            toast.error(error.message)
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
            <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
                <p className="text-2xl font-semibold m-auto"><span className="text-primary">{state}</span> Login</p>
                <div className="w-full">
                    <p className="text-black">Email</p>
                    <input value={email} onChange={e => setEmail(e.target.value)} className="border border-[#DADADA] rounded w-full p-2 mt-1" type="email" required />
                </div>
                <div className="w-full">
                    <p className="text-black">Password</p>
                    <input value={password} onChange={e => setPassword(e.target.value)} className="border border-[#DADADA] rounded w-full p-2 mt-1" type="password" required />
                </div>
                <button className="bg-primary text-white w-full py-2 rounded-md text-base">Login</button>
                {
                    state==="Admin"
                    ? <p>Are you a Doctor? <span className="text-primary underline cursor-pointer" onClick={() => (setState('Doctor'))}>Click here</span></p>
                    : <p>Are you a Admin? <span className="text-primary underline cursor-pointer" onClick={() => (setState('Admin'))}>Click here</span></p>
                }
            </div>
        </form>
    )
}

export default Login
