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

    const getDoctorsData = async () => {

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
            console.log("Error Occured while reaching to the api : ", error)
            toast.error(error.message)
        }

    }

    useEffect(() => {
        getDoctorsData()
    }, [])


    const loadUserProfileData = async () => {
        try {

            const { data } = await axios.get(backendUrl + "/api/user/get-profile", { headers: { token } })

            if (data.success) {
                setUserData(data.userData)
            }
            else {
                toast.error(error.message)
            }


        }
        catch (error) {
            console.log("Error Occured during while calling the get-profile api", error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (token) {
            loadUserProfileData()
        }
        else {
            setUserData(null)
        }
    }, [token])


    const value = {
        doctors, getDoctorsData,
        currencySymbol,
        backendUrl,
        token, setToken,
        userData, setUserData,
        loadUserProfileData,

    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider
