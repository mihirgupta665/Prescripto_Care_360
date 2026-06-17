import express from "express"
import cors from "cors"
import "dotenv/config"

import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"

import adminRouter from "./routes/adminRoute.js"


// app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()



// middlewares
app.use(express.json())
app.use(cors())
app.disable("etag")
app.use((req, res, next) => {
    res.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate")
    res.set("Pragma", "no-cache")
    res.set("Expires", "0")
    next()
})

// api endpoints 

// localhost:4000/api/admin/add-doctors
app.use("/api/admin", adminRouter)

app.get("/", (req, res) => {
    console.log("route hit")
    res.send("Application's API Working!!!")
})



app.listen(port, () => console.log("Server Started at PORT :", port))
