import { createContext, useEffect, useState } from "react";
import axios from "axios"
import { toast } from "react-toastify";


export const AppContext = createContext()

const AppContextProvider = (props) => {

    const currencySymbol = "$"
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : "")

    const [doctors, setDoctors] = useState([])
    const [userData, setUserData] = useState(false)
    const [doctorsLoading, setDoctorsLoading] = useState(true)
    const [userDataLoading, setUserDataLoading] = useState(false)

    const getDoctorsData = async () => {
        setDoctorsLoading(true)

        try {

            const { data } = await axios.get(backendUrl + "/api/doctor/list")
            if (data.success) {
                setDoctors(data.doctors)
            }
            else {
                toast.error(data.message)
            }

        }
        catch (error) {
            toast.error(error.message)
        }
        finally {
            setDoctorsLoading(false)
        }

    }

    useEffect(() => {
        getDoctorsData()
    }, [])

    useEffect(() => {
        if (!backendUrl) return

        // Keep-alive ping every 12 minutes (Render spin-down is 15 mins of inactivity)
        const interval = setInterval(() => {
            axios.get(backendUrl).catch(() => {})
        }, 12 * 60 * 1000)

        return () => clearInterval(interval)
    }, [backendUrl])



    const loadUserProfileData = async () => {
        setUserDataLoading(true)

        try {

            const { data } = await axios.get(backendUrl + "/api/user/get-profile", { headers: { token } })

            if (data.success) {
                setUserData(data.userData)
            }
            else {
                toast.error(data.message)
            }


        }
        catch (error) {
            toast.error(error.message)
        }
        finally {
            setUserDataLoading(false)
        }
    }

    useEffect(() => {
        if (token) {
            loadUserProfileData()
        }
        else {
            setUserData(null)
            setUserDataLoading(false)
        }
    }, [token])


    const value = {
        doctors, getDoctorsData,
        doctorsLoading,
        currencySymbol,
        backendUrl,
        token, setToken,
        userData, setUserData,
        userDataLoading,
        loadUserProfileData,

    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider
