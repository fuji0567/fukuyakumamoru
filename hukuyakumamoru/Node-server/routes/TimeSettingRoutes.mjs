import express from "express"
import TimeSettingModel from "../models/TimeSetting.mjs"

const router = express.Router()

router.get("/", async (req, res) => {
    const TimeSettings = await TimeSettingModel.find({})
    try {
        res.send(TimeSettings)
    } catch(err) {
        res.status(500).send(err)
    }
})

router.post("/", async (req, res) => {
    const TimeSetting = new TimeSettingModel(req.body)
    try {
        await TimeSetting.save()
        res.send(TimeSetting)
    } catch(err) {
        res.status(500).send(err)
    }
})

router.patch("/:id", async (req, res) => {
    try {
        await TimeSettingModel.findByIdAndUpdate(req.params.id, req.body)
        await TimeSettingModel.save()
    } catch(err) {
        res.status(500).send(err)
    }
})

export default router