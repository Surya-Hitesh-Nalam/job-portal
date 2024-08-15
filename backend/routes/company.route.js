import express from "express"
import isAunthenticated from "../middlewares/isAunthenticated.js"
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/company.controller.js"

const router = express.Router()

router.route('/register').post(isAunthenticated,registerCompany)
router.route('/get').get(isAunthenticated,getCompany)
router.route('/get/:id').get(isAunthenticated,getCompanyById)
router.route('/update/:id').put(isAunthenticated,updateCompany)

export default router