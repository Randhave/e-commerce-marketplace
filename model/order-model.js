import mongoose from "mongoose";

export const orderSchema = new mongoose.Schema({
    buyerId: {
        type: String,
        required: true
    },
    products: [
        {

        }
    ]
})

const order = mongoose.model("orders",orderSchema);

export default order ;