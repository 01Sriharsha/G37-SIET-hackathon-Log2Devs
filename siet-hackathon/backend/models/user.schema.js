import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs"
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    isverified:{
        type:Boolean,
        default:false,
        required:true
    },
    password: {
        type: String,
        required: true,
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    verifyOtp:{
        type:String,
        required:false
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    crops:[
        {
            type:String
        }
    ],
    gender:{
        type:String,
        enum:['Male','Female','Others'],
        required:true
    },
    address:{
        type:String,
        required:true
    }
}, {
    timestamps: true  // Corrected option name to "timestamps"
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();  // Skip hashing if password is not modified
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;