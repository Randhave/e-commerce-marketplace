import buyer from "../../model/buyer-model.js";


export const addbuyer = async (req, res) => {
    try {
        let data = await buyer(req.body).save()

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

// get all buyers
export const allbuyers = async (req, res) => {
    try {
        let data = await buyer.find();
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

// get buyer 
export const getbuyer = async (req, res) => {
    try {
        let data = await buyer.findById(req.params.buyerId)
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

// delete buyer
export const deletebuyer = async (req, res) => {
    try {
        let data = await buyer.findByIdAndDelete(req.params.buyerId)
        res.json({
            success: true,
            data,
            message: 'buyer deleted successfully'
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: `${error.message}`
        })
    }
}

// update buyer
export const updatebuyer = async (req, res) => {
    try {
        let data = await buyer.findByIdAndUpdate(req.params.buyerId, { $set: req.body });
        await data.save()
        res.json({
            success: true,
            data,
            message: 'buyer updated successfully'
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            error: `${error.message}`
        })
    }
}

// get all buyers
export const allbuyer = async (req, res) => {
    try {
        let data = await buyer.find();
        res.status(200).json({
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