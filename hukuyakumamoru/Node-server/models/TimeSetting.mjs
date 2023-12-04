import mongoose from "mongoose";

const TimeSettingSchema = new mongoose.Schema({
    sunday: {
        day: String,
        morning: {
            name: String,
            time: String,
        },
        afternoon: {
            name: String,
            time: String,
        },
        evening: {
            name: String,
            time: String,
        },
        night: {
            name: String,
            time: String,
        }
    },
    monday: {
        day: String,
        morning: {
            name: String,
            time: String,
        },
        afternoon: {
            name: String,
            time: String,
        },
        evening: {
            name: String,
            time: String,
        },
        night: {
            name: String,
            time: String,
        }
    },
    tuesday: {
        day: String,
        morning: {
            name: String,
            time: String,
        },
        afternoon: {
            name: String,
            time: String,
        },
        evening: {
            name: String,
            time: String,
        },
        night: {
            name: String,
            time: String,
        }
    },
    wednesday: {
        day: String,
        morning: {
            name: String,
            time: String,
        },
        afternoon: {
            name: String,
            time: String,
        },
        evening: {
            name: String,
            time: String,
        },
        night: {
            name: String,
            time: String,
        }
    },
    thursday: {
        day: String,
        morning: {
            name: String,
            time: String,
        },
        afternoon: {
            name: String,
            time: String,
        },
        evening: {
            name: String,
            time: String,
        },
        night: {
            name: String,
            time: String,
        }
    },
    friday: {
        day: String,
        morning: {
            name: String,
            time: String,
        },
        afternoon: {
            name: String,
            time: String,
        },
        evening: {
            name: String,
            time: String,
        },
        night: {
            name: String,
            time: String,
        }
    },
    saturday: {
        day: String,
        morning: {
            name: String,
            time: String,
        },
        afternoon: {
            name: String,
            time: String,
        },
        evening: {
            name: String,
            time: String,
        },
        night: {
            name: String,
            time: String,
        }
    }
})

const TimeSettingModel = mongoose.model("settingtime", TimeSettingSchema)
export default TimeSettingModel