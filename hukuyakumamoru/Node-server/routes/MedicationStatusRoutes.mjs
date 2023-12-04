import express from "express"
import MedicationStatusModel from "../models/MedicationStatus.mjs"

const router = express.Router()

router.get("/", async (req, res) => {
    const MedicationStatuses = await MedicationStatusModel.find({})
    try {
        res.send(MedicationStatuses)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.post("/", async (req, res) => {
    const MedicationStatus = new MedicationStatusModel(req.body)
    try {
        await MedicationStatus.save()
        res.send(MedicationStatus)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.patch("/:id", async (req, res) => {
    try {
        await MedicationStatusModel.findByIdAndUpdate(req.params.id, req.body)
        await MedicationStatusModel.save()
    } catch(err) {
        res.status(500).send(err)
    }
})

export default router
