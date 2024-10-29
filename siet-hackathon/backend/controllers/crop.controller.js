import Crop from "../models/crop.schema.js";
import User from "../models/user.schema.js";
export const createCrop=async (req,res)=>{
    const {crop,quantity,type,description,priceperkg,isNegotiable}=req.body
    const totalPrice=quantity*priceperkg
    const newCrop=new Crop({
        crop,
        quantity,
        type,
        description,
        priceperkg,
        totalPrice,
        isNegotiable

    })
    await newCrop.save()
    res.status(201).json({message:"New crop added",newCrop:newCrop})
}

export const getAllCrop=async (req,res)=>{

}