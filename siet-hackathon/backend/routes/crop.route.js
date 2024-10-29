import express from 'express'
import { createCrop } from '../controllers/crop.controller.js'
import { authenticate } from '../middleware/auth.middleware.js'
const router=express.Router()

router.post("/create",authenticate,createCrop)


export default router