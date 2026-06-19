import validator from "validator"
import bcrypt from "bcrypt"
import userModel from "../models/userModel.js"
import jwt from "jsonwebtoken"


// API controller(function) to register user
const registerUser = async (req, res) => {

    try{

        const {name, email, password} = req.body()

        if(!name || !emai || !password){
            return res.json({success:false, message:"Missing Credentials!"})
        }

        if(!validator.isEmail(email)){
            return res.json({success:false, message:"Please Enter a valid Email!"})
        }

        if(password.length < 8){
            return res.json({success:false, message:"Please Enter a Strong Password!"})
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

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET )
        
        res.json({success:true, token})


    }
    catch(error){
        console.log("Error Occured while Registering the User : ",error)
        res.json({success:false, message:error.message})
    }

}

export {registerUser}