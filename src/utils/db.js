import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.ATLAS_URI, {});
        console.log("MogoDb is Connected")
    } catch (error) {
        console.log(error.message)
        process.exit()
    }
}

export default connectDB