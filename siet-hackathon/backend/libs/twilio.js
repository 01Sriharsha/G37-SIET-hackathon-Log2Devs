import twilio from "twilio";
import dotenv from 'dotenv'
dotenv.config()
const client=twilio(process.env.TWILIO_ACCOUNT_SID,process.env.TWILIO_AUTH_TOKEN,{
    autoRetry: true,
    maxRetries: 3,
})

export const sendSMS=async (to,body)=>{
    const res=await client.messages.create({
        from:"+18643851297",
        to:"+91"+to,
        body,
    })
    if (res.errorMessage || res.errorCode) {
        console.error("Twilio message error:", res.errorMessage);
        throw new Error("Failed to send sms!");
      }
}