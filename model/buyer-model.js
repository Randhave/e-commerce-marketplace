import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const buyersSchema = new mongoose.Schema({
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
        required: true
    },
})


// create jsonwebtoken
buyersSchema.methods.generateToken = async function (next) {
    return jwt.sign({ id: this._id }, process.env.PRIVATE_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
    });
}


// decrypt password before save 
buyersSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 12)
})
const buyer = mongoose.model("buyers", buyersSchema)


export default buyer