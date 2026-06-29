import moongoose, { mongo } from 'mongoose'
import { env } from './env.js'
import mongoose from 'mongoose'

mongoose.set('strictQuery',true)

const connectDB = async () => {
    try{
        await mongoose.connect(env.mongoUri,{
        serverSelectionTimeoutMS : 10000,
    })
        console.log("✅ Connected to MongoDB Server")
    }
    catch(err){
        console.log("❌ MongoDB Connection Error : ",err.message)
        throw(err)
    }
}

export default connectDB