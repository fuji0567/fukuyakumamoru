import mongoose from "mongoose"

const ManageMonthSchema = new mongoose.Schema({
    date: {
        type: String,
    },
    completedNumber: {
        type: Number,
    }
})

const ManageMonthModel = mongoose.model("completednumber", ManageMonthSchema)
export default ManageMonthModel