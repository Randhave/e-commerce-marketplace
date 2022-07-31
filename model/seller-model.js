import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export const sellerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    modelType: {
        type: String,
        required: true,
    },
})


// create jsonwebtoken
sellerSchema.methods.generateToken = async function (next) {
    return jwt.sign({ id: this._id }, process.env.PRIVATE_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
    });
}


// decrypt password before save 
sellerSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 12)
})

const seller = mongoose.model("sellers", sellerSchema)
export default seller