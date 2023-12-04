import mongoose from "mongoose";

const MedicationStatusSchema = new mongoose.Schema({
    sunday: {
        day: String,
        morning: Boolean,
        afternoon: Boolean,
        evening: Boolean,
        night: Boolean
    },
    monday: {
        day: String,
        morning: Boolean,
        afternoon: Boolean,
        evening: Boolean,
        night: Boolean
    },
    tuesday: {
        day: String,
        morning: Boolean,
        afternoon: Boolean,
        evening: Boolean,
        night: Boolean
    }, 
    wednesday: {
        day: String,
        morning: Boolean,
        afternoon: Boolean,
        evening: Boolean,
        night: Boolean
    },
    thursday: {
        day: String,
        morning: Boolean,
        afternoon: Boolean,
        evening: Boolean,
        night: Boolean
    },
    friday: {
        day: String,
        morning: Boolean,
        afternoon: Boolean,
        evening: Boolean,
        night: Boolean
    },
    saturday: {
        day: String,
        morning: Boolean,
        afternoon: Boolean,
        evening: Boolean,
        night: Boolean
    }
})

const MedicationStatusModel = mongoose.model("isputmedicine", MedicationStatusSchema)
export default MedicationStatusModel