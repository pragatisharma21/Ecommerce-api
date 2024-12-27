import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: false },
        googleId: { type: String, required: false },
        profileImage: { type: String, required: false }, 
        mobileNumber: { type: String, required: false },
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;