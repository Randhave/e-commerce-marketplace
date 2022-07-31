import mongoose from "mongoose";

export const productSchema = new mongoose.Schema({
    sellerId : {
        type : String,
        required : true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})
const product = mongoose.model("product", productSchema);

export default product