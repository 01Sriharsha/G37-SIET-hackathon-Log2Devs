import express from 'express'
import axios from 'axios'
export const predict=async(req,res)=>{
    try{
        const response=await axios.post('https://crop-predictor-911n.onrender.com/predict',req.body)
        res.status(200).json({data:response.data})
    }
    catch(err){
        res.status(500).json({message:"error occured while fetching prediction"})
    }
}