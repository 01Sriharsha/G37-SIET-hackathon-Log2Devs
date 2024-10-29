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
        isNegotiable,
        user:req.user

    })
    await newCrop.save()
    res.status(201).json({message:"New crop added",data:newCrop})
}

export const getAllCrops = async (req, res) => {
    try {
        const crops = await Crop.find();
        res.status(200).json(crops);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteCrop = async (req, res) => {
    try {
        const deletedCrop = await Crop.findByIdAndDelete(req.params.id);
        if (!deletedCrop) return res.status(404).json({ message: "Crop not found" });
        res.status(200).json({ message: "Crop deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};