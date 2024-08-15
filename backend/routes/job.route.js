import express from "express"
import isAunthenticated from "../middlewares/isAunthenticated.js"
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/job.controller.js"

const router = express.Router()

router.route('/post').post(isAunthenticated,postJob)
router.route('/get').get(isAunthenticated,getAllJobs)
router.route('/getAdminJobs').get(isAunthenticated,getAdminJobs)
router.route('/get/:id').get(isAunthenticated,getJobById)

export default router