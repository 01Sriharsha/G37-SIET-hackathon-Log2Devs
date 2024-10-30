import express from 'express'
import { predict } from '../controllers/predict.controller.js'

const router=express.Router()
router.post('/',predict)
export default router