import mongoose from 'mongoose'
import marketPrice from '../models/market.schema.js'
export const getMarketPrice=async(req,res)=>{
    const {district}=req.body
    
    try{
        const marketRecords = await marketPrice.find({});

    // Filter the records array for the specified district
   
    const filteredRecords = marketRecords.flatMap(record => 
      record.records.filter(item => item.district.toLowerCase() === district.toLowerCase())
    );
    
    if (filteredRecords.length === 0) {
      return res.status(404).json({ message: 'No records found for this district.' });
    }
        res.status(200).json({message:`markets in ${district}`,data:filteredRecords})
    }catch(err){
        res.status(500).json({message:"failed to fetch the data",data:err.message})
    }
}
