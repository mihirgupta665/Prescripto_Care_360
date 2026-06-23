import mongoose from "mongoose"

const connectDB = async () => {

    mongoose.connection.on('connected', () => console.log("Database Connected"))

    const mongoUri = process.env.MONGODB_URI
    const dbName = process.env.MONGODB_DB_NAME || "prescripto360care"

    if (!mongoUri) {
        throw new Error("MONGODB_URI environment variable is missing")
    }

    await mongoose.connect(mongoUri, { dbName })
}

export default connectDB
