import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import {useNavigate} from "react-router-dom"

const Navbar = () => {

    useNavigate()

    const {aToken, setAToken} = useContext(AdminContext)

    const navigate = useNavigate()

    const logout = () => {
        aToken && setAToken("")
        aToken && localStorage.removeItem("aToken")
        navigate('/')
    }

    return (
        <div className="flex justify-between items-center px-4 sm:px-10 py-2 border-b bg-white">
            <div className="flex items-center gap-2 text-xs">
                <img className="h-12 sm:h-14 w-auto cursor-pointer" src={assets.admin_logo} alt="" />
                <p className="border mx-4 px-4 py-0.5 rounded-full border-primary text-green-600 text-sm">{aToken ? "Admin" : "Doctor"}</p>
            </div>
            <button onClick={logout} className="bg-primary text-white text-sm px-10 py-2 rounded-full">Logout</button>
        </div>
    )
}

export default Navbar
