import mongoose, { Schema } from 'mongoose'
const cropSchema=mongoose.Schema({
    crop:{
        type:String,
        unique:true,
    },
    user:{
        type:Schema.Types.ObjectId,
        required:true
    },
    quantity:{
        type:Number,
    },
    type:{
        enum:['fruit','vegetable','grain'],
        type:String,
    },
    condition:{
        enum:['fresh','dry','frozen'],
        type:String,
    },
    description:{
        type:String
    },
    priceperkg:{
        type:Number
    },
    totalPrice:{
        type:Number,
    },
    isNegotiable:{
        type:Boolean,
        default:false
    }
    
})
const Crop=mongoose.model("Crop",cropSchema)
export default Crop