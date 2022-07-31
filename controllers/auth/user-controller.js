import seller from "../../model/seller-model.js";
import buyer from "../../model/buyer-model.js";


export const adduser = async (req, res) => {
    try {
        let data
        if (req.body.modelType === null || req.body.modelType === undefined) {
            throw new Error("Please specified model type")
        }
        else if (req.body.modelType === "seller") {
            data = await seller(req.body).save()
        }
        else if (req.body.modelType === "buyer") {
            data = await buyer(req.body).save()
        }
        res.json({
            success: true,
            data
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: `${error.message}`
        })
    }
}


// get user 
export const getuser = async (req, res) => {
    try {
        let data;
        if (req.seller !== undefined) {
            data = await seller.findById(req.params.sellerId)
        }
        else if (req.buyer !== undefined) {
            data = await buyer.findById(req.params.buyerId)
        }
        res.json({
            success: true,
            data
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: `${error.message}`
        })
    }
}



// update user
export const updateuser = async (req, res) => {
    try {
        let data;

        if (req.seller !== undefined) {
            data = await user.findByIdAndUpdate(req.params.sellerId, { $set: req.body });
        }
        else if (req.buyer !== undefined) {
            data = await user.findByIdAndUpdate(req.params.buyerId, { $set: req.body });
        }

        await data.save()
        res.json({
            success: true,
            data,
            message: 'user updated successfully'
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            error: `${error.message}`
        })
    }
}