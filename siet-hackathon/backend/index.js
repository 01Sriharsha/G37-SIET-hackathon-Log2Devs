import express from "express"
import dotenv from "dotenv"
import connectDb from "./utils/db.js"
import cors from 'cors'
import cookieParser from "cookie-parser"
import router from "./routes/index.js"
const app=express()
app.get("/",(req,res)=>{
    res.send("hello")
})
dotenv.config()


connectDb()

//middleware
app.use(express.json())
app.use(cors({ origin: [`http://localhost:3000`], credentials: true }));
app.use(cookieParser())

//routes
app.use('/api',router)

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})

