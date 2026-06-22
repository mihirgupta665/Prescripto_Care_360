import jwt from "jsonwebtoken"
import doctorModel from "../models/doctorModel.js"


const authDoctor = async (req, res, next) => {

    try {

        // in req the headers become in lower case as express changes the case to lower case
        const { dtoken } = req.headers

        if (!dtoken) {
            return res.json({ success: false, message: "Not Authorized as Doctor! \nLogin Again!!" })
        }

        const decodeToken = await jwt.verify(dtoken, process.env.JWT_SECRET)
        const docId = decodeToken.id

        const docData = await doctorModel.findById(docId)

        if (docData) {
            req.body = req.body || {}
            req.body.docId = docId
            next()
        }
        else {
            res.json({ success: false, message: "Not Authorized Invalid Token \nLogin Again!!" })
        }

    } 
    catch (error) {
        console.log("Error Occured while Authentication of the Token. Error : ",error)
        res.json({ success:false, message: error.message })
    }

}

export default authDoctor