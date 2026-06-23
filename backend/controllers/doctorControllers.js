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

        const appointmentData = appointmentModel.findById(appointmentId)

        if (appointmentData && appointmentData.docId === docId) {

            await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true })
            return res.json({ success: true, message: "Appointment Successfully Completed!!" })

        }
        else if (!appointmentData) {
            return res.json({ success: false, message: "Appointment Does not Exists" })
        }
        else {
            return res.json({ success: false, message: "Not Authorized to cancel" })
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
        else if (!appointmentData) {
            return res.json({ success: false, message: "Appointment Does not Exists" })
        }
        else {
            return res.json({ success: false, message: "Not Authorized to cancel" })
        }

    }
    catch (error) {

        console.log("Error Occured during cancelling the appointment from doctor database. Error : ",error)
        res.json({success:false, message:error.message})

    }

}






export { changeAvailability, doctorList, loginDoctor, appointmentsDoctor, appointmentComplete, appointmentCancel }