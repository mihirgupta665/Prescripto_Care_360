import doctorModel from "../models/doctorModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import appointmentModel from "../models/appointmentModel.js"

// API controller function for Availability of doctor
const changeAvailability = async (req, res) => {
    try {

        const { docId } = req.body
        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId, { available: !docData.available })
        res.json({ success: true, message: `Doctor Availability changed to ${!docData.available}` })
    }
    catch {
        console.log("Eror Occured", error)
        res.json({ success: false, message: error.message })
    }
}


// API's controller function for list of all the doctors 
const doctorList = async (req, res) => {

    try {
        const doctors = await doctorModel.find({}).select(["-password", "-email"])
        res.json({ success: true, doctors })
    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}


// API's controller function for doctor login
const loginDoctor = async (req, res) => {

    try {

        const { email, password } = req.body

        const doctor = await doctorModel.findOne({ email })

        if (!doctor) {
            return res.json({ success: false, message: `Email - ${email} does not exists` })
        }

        const isMatch = await bcrypt.compare(password, doctor.password)

        if (isMatch) {

            const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET)

            res.json({ success: true, token })

        }
        else {

            res.json({ success: false, message: "Invalid Password" })

        }

    }
    catch (error) {
        console.log("Error Occured during login of the doctor with credentials from the database. Error : ", error)
        res.json({ success: false, message: error.message })
    }
}


// API's controller function to get all the appointments of a particular doctor
const appointmentsDoctor = async (req, res) => {

    const { docId } = req.body

    try {

        if (docId) {
            const appointments = await appointmentModel.find({ docId })
            res.json({ success: true, appointments })
        }
        else {
            res.json({ success: false, message: "Doctor Not found!" })
        }

    }
    catch (error) {
        console.log("Error Occured during fetching all the appointments of the doctor from the database. Error : ", error)
        res.json({ success: false, message: error.message })
    }

}

// API to mark the Appointment Complete for the doctor panel
const appointmentComplete = async (req, res) => {

    try {

        const { docId, appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        if (appointmentData && appointmentData.docId === docId) {

            await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true, payment: true })  // offline cash received
            return res.json({ success: true, message: `Appointment Successfull with ${appointmentData.userData.name}` })

        }
        else if (appointmentData && appointmentData.docId !== docId) {
            return res.json({ success: false, message: "Not Authorized to complete! \nLogin Again!!" })
        }
        else {
            return res.json({ success: false, message: "Appointment Does not Exists" })
        }

    }
    catch (error) {
        console.log("Error occured during completing the appointment as true in the database. Error : ", error)
        res.json({ success: false, message: error.message })
    }

}


// API to mark the Appointment Cancel for the doctor panel
const appointmentCancel = async (req, res) => {

    try {

        const { docId, appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        if (appointmentData && appointmentData.docId === docId) {

            await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled: true})

            let docData = await doctorModel.findById(docId)

            if (docData.slots_booked && docData.slots_booked[appointmentData.slotDate]){

                let slots_booked = docData.slots_booked
                slots_booked[appointmentData.slotDate] = docData.slots_booked[appointmentData.slotDate].filter((slotTime) => slotTime != appointmentData.slotTime)
                await doctorModel.findByIdAndUpdate(docId, { slots_booked })
                
                res.json({ success: true, message: `Appointment Cancel with ${appointmentData.userData.name}` })

            }
            else {
                
                res.json({ success: false, message: `Appointment does not exists at ${appointmentData.slotTime}` })
                
            }

        }
        else if (appointmentData && appointmentData.docId !== docId){
            return res.json({ success: false, message: "Not Authorized to cancel! \nLogin Again!!" })
        }
        else{
            return res.json({ success: false, message: "Appointment Does not Exists" })
        }

    }
    catch (error) {

        console.log("Error Occured during cancelling the appointment from doctor database. Error : ",error)
        res.json({success:false, message:error.message})

    }

}


// API to get dashboard data for doctor panel
const doctorDashboard = async (req, res) => {

    try {
        
        const {docId} = req.body

        const appointments = await  appointmentModel.find({docId})

        let earnings = 0

        appointments.map((item) => {

            if(item.isCompleted || item.payment){
                earnings += item.amount
            }

        })


        let patients = []

        appointments.map( (item) => {
            if(!patients.includes(item.userId)) {
                patients.push(item.userId)
            }
        })

        const startOfWeek = (date) => {
            const weekDate = new Date(date)
            const day = weekDate.getDay()
            const diff = weekDate.getDate() - day + (day === 0 ? -6 : 1)
            weekDate.setDate(diff)
            weekDate.setHours(0, 0, 0, 0)
            return weekDate
        }

        const formatWeek = (date) => date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric"
        })

        const graphStartDate = startOfWeek(new Date(new Date().getFullYear(), 4, 25))

        const weeklyAnalytics = Array.from({ length: 8 }, (_, index) => {
            const weekStart = new Date(graphStartDate)
            weekStart.setDate(weekStart.getDate() + (index * 7))

            return {
                week: formatWeek(weekStart),
                earnings: 0,
                appointments: 0
            }
        })

        const weekLookup = new Map(weeklyAnalytics.map((week) => [week.week, week]))

        appointments.forEach((appointment) => {
            if (appointment.cancelled) {
                return
            }

            const appointmentDate = new Date(appointment.date)
            const week = formatWeek(startOfWeek(appointmentDate))
            const weekData = weekLookup.get(week)

            if (weekData) {
                weekData.appointments += 1

                if (appointment.isCompleted || appointment.payment) {
                    weekData.earnings += appointment.amount
                }
            }
        })

        const dashData = {

            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse().slice(0,5),
            weeklyAnalytics

        }

        res.json({success:true, dashData})

    }
    
    catch (error) {
        
        console.log("Error Occured while fetching the data from dashboard to form the the dashboard data of doctor. Error : ", error)
        res.json({success:false, message:error.message})
        
    }

}


// API to get doctor profile for Doctor Panel
const doctorProfile = async (req, res) => {

    try {
        
        const {docId} = req.body

        const profileData = await doctorModel.findById(docId).select("-password")

        if(profileData) {
            res.json({success:true, profileData})
        }
        else{
            res.json({success:false, message:"No doctor found!!"})
        }

    }
    catch (error) {
        console.log("Error Ocurred furing fetching the doctor data from the database using doctor id. Error : ",error)
        res.json({success:false, message:error.message})
    }

}


// API's controller function to update doctor profile data from the Doctor Panel
const updateDoctorProfile = async (req, res) => {

    try {
        
        const {docId, fees, address, available} = req.body

        const docData = await doctorModel.findByIdAndUpdate(docId, {fees, address, available})

        if(docData){
            res.json({success: true, message: "Profile Updated"})
        }
        else{
            res.json({success:false, message:"Doctor Not Found!"})
        }


    }
    catch (error) {
        
        console.log("Error occured during updating the doctor data in the doctor database. Error : ",error)
        res.json({success:false, message:error.message})

    }

}






export { changeAvailability, doctorList, loginDoctor, appointmentsDoctor, appointmentComplete, appointmentCancel, doctorDashboard, doctorProfile,  updateDoctorProfile}
