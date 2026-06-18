import doctorModel from "../models/doctorModel"

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

export { changeAvailability }