import express from 'express'
import { getMarketPrice } from '../controllers/market.controller.js'


const router=express.Router()

router.get("/",getMarketPrice)
export default router
