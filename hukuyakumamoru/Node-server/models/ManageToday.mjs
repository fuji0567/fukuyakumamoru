import mongoose from "mongoose"

const ManageTodaySchema = new mongoose.Schema({
    morning: {
        name: String,
        isImageComplete: Boolean,
        isCupComplete: Boolean,
    },
    afternoon: {
        name: String,
        isImageComplete: Boolean,
        isCupComplete: Boolean,
    },
    evening: {
        name: String,
        isImageComplete: Boolean,
        isCupComplete: Boolean,
    },
    night: {
        name: String,
        isImageComplete: Boolean,
        isCupComplete: Boolean,
    }
})

const ManageTodayModel = mongoose.model("istakemedicine", ManageTodaySchema)
export default ManageTodayModel