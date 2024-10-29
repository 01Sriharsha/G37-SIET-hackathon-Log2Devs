import express from 'express'
import { createCrop ,getAllCrops,deleteCrop} from '../controllers/crop.controller.js'
import { authenticate } from '../middleware/auth.middleware.js'
const router=express.Router()

router.post("/create",authenticate,createCrop)
router.get("/getAllCrops",getAllCrops)
router.delete("/:id",deleteCrop)
export default router