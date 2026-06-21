import validator from "validator"
import bcrypt from "bcrypt"
import userModel from "../models/userModel.js"
import jwt from "jsonwebtoken"
import { v2 as cloudinary } from "cloudinary"
import doctorModel from "../models/doctorModel.js"
import appointmentModel from "../models/appointmentModel.js"
import razorpay from "razorpay"


// API controller(function) to register user
const registerUser = async (req, res) => {

    try {

        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.json({ success: false, message: "Missing Credentials!" })
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please Enter a valid Email!" })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please Enter a Strong Password!" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        // creating object to be stored in database
        const userData = {
            name,
            email,
            password: hashPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.json({ success: true, token })


    }
    catch (error) {
        console.log("Error Occured while Registering the User in database : ", error)
        res.json({ success: false, message: error.message })
    }

}

// API's Controller function for user login 
const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body

        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: `Email - ${email} does not exist!` })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: "Please enter correct Password!" })
        }


    }
    catch (error) {
        console.log("Error Occured while user login : ", error)
        res.json({ success: false, message: error.message })
    }


}

// API's Controller to get User Profile Data
const getProfile = async (req, res) => {
    try {

        const { userId } = req.body

        const userData = await userModel.findById(userId).select("-password")

        res.json({ success: true, userData })

    }
    catch (error) {
        console.log("Error Occured while fetching the user data : ", error)
        res.json({ success: false, message: error.message })
    }
}

// API's  Controller to update the User Profile Data
const updateProfile = async (req, res) => {

    try {

        const { userId, name, phone, address, dob, gender } = req.body
        const imageFile = req.file

        if (!name || !phone || !address || !dob || !gender) {
            return res.json({ success: false, message: "Data Missing" })
        }

        await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender })

        if (imageFile) {

            // upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
            const imageURL = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId, { image: imageURL })

        }

        res.json({ success: true, message: `User - ${name} Profile Updated Successfully` })

    }

    catch (error) {
        console.log("Error Occured while updating the values in the user database : ", error)
        res.json({ success: false, message: error.message })
    }

}

// API's Controller function to book the Appointment with Doctor
const bookAppointment = async (req, res) => {

    try {

        const { userId, docId, slotDate, slotTime } = req.body


        // Fetching Doctor Data
        const docData = await doctorModel.findById(docId).select("-password")

        if (!docData.available) {
            return res.json({ success: false, message: "Doctor is not Available" })
        }

        // Checking for Slots Availability
        let slots_booked = docData.slots_booked

        // what is the value of slotDate and how it is working as the index 
        // what is the value of slot time
        // why i was understanding is that slots_booked is an object and slotDate is property but the array of slotDate what i though will contain object with properties datatime and time
        // if slot time is only thime then why in that slodate only time is added date should also be added or is this happeing that we are changine the intial formal to key as date(string) and value as array of time(string) only
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: `For ${docData.name}, \nSlot at ${slotTime} is Busy` })
            }
            else {
                // book the appointment
                slots_booked[slotDate].push(slotTime)
            }
        }
        else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime) // book the appointment
        }

        delete docData.slots_booked


        // Fetcing User Data
        const userData = await userModel.findById(userId).select("-password")

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()


        // updating booked_slots of doctor in database
        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        res.json({ success: true, message: `Appointment Booked for : \nUser - ${userData.name} with - ${docData.name}` })


    }
    catch (error) {

        console.log("Error while booking and saving the appointment in the database : ", error)
        res.json({ succes: true, message: error.message })

    }

}


// API Controller function to get the user appointments for the frontend my-appointment page
const listAppointment = async (req, res) => {

    try {

        const { userId } = req.body
        const appointments = await appointmentModel.find({ userId })

        res.json({ success: true, appointments })

    }
    catch (error) {
        console.log("Error Occured while getting the appointment data from the database : ", error)
        res.json({ success: false, message: error.message })
    }

}


// API's Controller function to cancel the Appointment
const cancelAppointment = async (req, res) => {

    try {

        const { userId, appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        // Verify Appointment User
        if (appointmentData.userId !== userId) {
            return res.json({ success: false, message: "UnAuthorized Action" })
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        // releasing doctor slot

        const { docId, slotDate, slotTime } = appointmentData

        const doctorData = await doctorModel.findById(docId)

        const slots_booked = doctorData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter(slot => slot !== slotTime)

        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        res.json({ success: true, message: `Appointment Cancelled for Time - ${slotTime}` })

    }
    catch (error) {

        console.log("Error Occured while cancelling the slot time of the doctor. Error : ", error)
        res.json({ success: false, message: error.message })

    }

}


const razorpayInstance = new razorpay({

    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET

})

// API Controllers function to make the appointment online using razor pay
const paymentRazorpay = async (req, res) => {

    try {

        const { appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        if (!appointmentData || appointmentData.cancelled) {
            return res.json({ success: false, message: "Appointment Cancelled or Appointment Not Found" })
        }

        // creating options for Razor Pay Payment
        const options = {
            amount: appointmentData.amount * 100,
            currency: process.env.CURRENCY,
            receipt: appointmentId,
        }

        // creation of an order
        const order = await razorpayInstance.orders.create(options)

        res.json({ success: true, order })

    } 
    catch (error) {
        console.log("Error Occured while creating an order with RazorPay. Error : ",error)
        res.json({success:false, message:error.message})
    }


}






export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment }
