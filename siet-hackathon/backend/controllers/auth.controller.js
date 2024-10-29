import User from "../models/user.schema.js";
import { sendSMS } from "../libs/twilio.js";

import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { generateVerificationOTP } from "../utils/token.js";
dotenv.config()
export const registerUser=async (req,res,next)=>{
    const {username,password,phone,gender}=req.body
    if (password.length < 6) {
        return res.status(400).json({ message: "Password less than 6 characters" })
      }
      const userExists = await User.findOne({ phone });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }
        try{
            const Otp=generateVerificationOTP()
            await User.create({
              username,
              password,
              gender,
              phone,
              verifyOtp:Otp,
              created_at:Date.now()
            }).then(async (user) =>{
                
                await sendSMS(user.phone,`your verification OTP is ${Otp}`)
              return res.status(200).json({
                message: `${user.username}has successfully registered and verification code has been send`,
                user,
                
              })
            }
            )
          } catch (err) {
            res.status(401).json({
              message: "User not successfully created",
              error: err.message,
            })
          }
      
      
}

export const login=async (req,res,next)=>{
    const { phone, password} = req.body
  // Check if username and password is provided
  if (!phone || !password ) {
    return res.status(400).json({
      message: "Username or Password not present",
    })
  }
  try {
    const user = await User.findOne({ phone })
    if (!user) {
      res.status(401).json({
        message: "Login not successful",
        error: "User not found",
      })
    } else {
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
       
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
        res.cookie("jwt", token, {
            httpOnly: true,
          });
      res.status(200).json({
        message: `${user.username} has logged in successfully`,
        user,
      })
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    })
  }
}


export const logoutUser =  (req, res) => {
    res.clearCookie('jwt'); // Clear the cookie with the name 'token'
    return res.status(200).json({ message: 'User logged out successfully' });
};

export const verifyOtp=async (req,res)=>{
    const {phone,otp}=req.body
    if(!phone){
        return res.status(401).json({message:"phone no is missing"})
    }
    if (!otp) {
        return res.status(401).json({ message: "verification otp missing!" });
      }
      const user=await User.findOne({phone})
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      if (user.verifyOtp != otp) {
        return res.status(401).json({ message: "Invalid verification otp!" });
      }
      const response=await User.updateOne(
        {_id:user._id},
        {isverified:true}
      )

      if (!response.acknowledged) {
        throw new Error("Failed to verify user!");
      }
      const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.cookie("jwt", token, {
        httpOnly: true,
      });
      return res.status(200).json({message:"verfication successful "})
}
