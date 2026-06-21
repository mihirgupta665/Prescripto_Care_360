import jwt from "jsonwebtoken"

const authUser = async (req, res, next) => {
    try{
        
        const {token} = req.headers
        if(!token){
            return res.json({ success: false, message: "Not Authorized Login Again"})
        }

        // find by id in user data if user exist only then sent the nex() else return a response that not authorized login again

        const token_decode = await jwt.verify(token, process.env.JWT_SECRET)
        req.body = req.body || {}
        req.body.userId = token_decode.id

        // check for all user that specific id exists or not if userdata found the only next() otherwise return failure
        next()
        

    }
    catch(error){
        console.log("Error occured while authentication of token",error)
        res.json({success:false, message:error.message})
    }
}

export default authUser
