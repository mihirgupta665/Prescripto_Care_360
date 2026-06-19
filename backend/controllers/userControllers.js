import validator from "validator"
import bcrypt from "bcrypt"
import userModel from "../models/userModel.js"
import jwt from "jsonwebtoken"


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

// API for user login
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






export { registerUser, loginUser }
