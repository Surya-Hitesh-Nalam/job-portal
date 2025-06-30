import express from "express"
import isAunthenticated from "../middlewares/isAunthenticated.js"
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.controller.js"

const router = express.Router()

router.route('/apply/:id').get(isAunthenticated,applyJob)
router.route('/get').get(isAunthenticated,getAppliedJobs)
router.route('/:id/applicants').get(isAunthenticated,getApplicants)
router.route('/status/:id/update').put(isAunthenticated,updateStatus)

export default router