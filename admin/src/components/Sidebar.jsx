import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'

function Sidebar() {

    const { aToken } = useContext(AdminContext)
    const { dToken } = useContext(DoctorContext)
    const linkClass = ({ isActive }) =>
        `flex items-center justify-center md:justify-start gap-3 py-3.5 px-3 md:px-9 w-16 md:w-auto md:min-w-72 cursor-pointer transition-colors ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : "border-r-4 border-transparent"}`
    const iconClass = 'w-5 h-5 min-w-5 object-contain'

    return (
        <div className='min-h-screen shrink-0 bg-white border-r'>
            {
                aToken &&
                <ul className='text-[#515151] mt-5'>

                    <NavLink className={linkClass} to={"/admin-dashboard"}>
                        <img className={iconClass} src={assets.home_icon} alt="" />
                        <p className="hidden md:block" >Dashboard</p>
                    </NavLink>
                    <NavLink className={linkClass} to={"/all-appointments"}>
                        <img className={iconClass} src={assets.appointment_icon} alt="" />
                        <p className="hidden md:block" >Appointments</p>
                    </NavLink>
                    <NavLink className={linkClass} to={"/add-doctor"}>
                        <img className={iconClass} src={assets.add_icon} alt="" />
                        <p className="hidden md:block" >Add Doctors</p>
                    </NavLink>
                    <NavLink className={linkClass} to={"/doctor-list"}>
                        <img className={iconClass} src={assets.people_icon} alt="" />
                        <p className="hidden md:block" >Doctors List</p>
                    </NavLink>

                </ul>
            }
            {
                dToken &&
                <ul className='text-[#515151] mt-5'>

                    <NavLink className={linkClass} to={"/doctor-dashboard"}>
                        <img className={iconClass} src={assets.home_icon} alt="" />
                        <p className="hidden md:block" >Dashboard</p>
                    </NavLink>
                    <NavLink className={linkClass} to={"/doctor-appointments"}>
                        <img className={iconClass} src={assets.appointment_icon} alt="" />
                        <p className="hidden md:block" >Appointments</p>
                    </NavLink>
                    <NavLink className={linkClass} to={"/doctor-profile"}>
                        <img className={iconClass} src={assets.people_icon} alt="" />
                        <p className="hidden md:block" >Profile</p>
                    </NavLink>

                </ul>
            }
        </div>
    )
}

export default Sidebar
