import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
import {useNavigate} from "react-router-dom"

const Navbar = () => {

    const {aToken, setAToken} = useContext(AdminContext)
    const {dToken, setDToken} = useContext(DoctorContext)

    const navigate = useNavigate()

    const logout = () => {
        aToken && setAToken("")
        aToken && localStorage.removeItem("aToken")
        dToken && setDToken("")
        dToken && localStorage.removeItem("dToken")
        navigate('/')
    }

    return (
        <div className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-gray-200 bg-white px-3 py-2 shadow-sm sm:px-6 lg:px-10">
            <div className="flex min-w-0 items-center gap-2 sm:gap-4">
                <img
                    onClick={() => navigate("/")}
                    className="h-10 w-auto max-w-[150px] shrink cursor-pointer object-contain sm:h-12 sm:max-w-[230px]"
                    src={assets.admin_logo}
                    alt="Prescripto360Care"
                />
                <p className="shrink-0 rounded-full border border-primary px-2.5 py-1 text-[11px] font-medium text-green-600 sm:px-4 sm:text-sm">
                    {aToken ? "Admin" : "Doctor"}
                </p>
            </div>
            <button
                onClick={logout}
                className="shrink-0 rounded-full bg-primary px-4 py-2 text-xs font-medium text-white shadow-sm transition hover:bg-primary/90 sm:px-8 sm:text-sm"
            >
                Logout
            </button>
        </div>
    )
}

export default Navbar
