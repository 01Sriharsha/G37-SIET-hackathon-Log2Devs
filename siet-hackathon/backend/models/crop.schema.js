import mongoose from 'mongoose'
const cropSchema=mongoose.Schema({
    crop:{
        type:String,
        unique:true,
    }
})
const Crop=mongoose.model("Crop",cropSchema)
export default Crop