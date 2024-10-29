import express from 'express'
import { login,registerUser,logoutUser,verifyOtp } from '../controllers/auth.controller.js';
const router=express.Router()

router.post('/register',registerUser)
router.post('/login',login)
router.post('/logout',logoutUser)
router.post('/verify',verifyOtp)
export default router;