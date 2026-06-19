import express from "express"
import { registerUser } from "../controllers/userControllers"

const userRouter = express.Router()

userRouter.post("/register", registerUser)





export default userRouter
