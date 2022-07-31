import seller from "../../model/seller-model.js";


export const addseller = async (req, res) => {
    try {
        let data = await seller(req.body).save()

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
// get seller 
export const getseller = async (req, res) => {
    try {
        let data = await seller.findById(req.params.sellerId)
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

// delete seller
export const deleteseller = async (req, res) => {
    try {
        let data = await seller.findByIdAndDelete(req.params.sellerId)
        res.json({
            success: true,
            data,
            message: 'seller deleted successfully'
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: `${error.message}`
        })
    }
}

// update seller
export const updateseller = async (req, res) => {
    try {
        let data = await seller.findByIdAndUpdate(req.params.sellerId, { $set: req.body });
        await data.save()
        res.json({
            success: true,
            data,
            message: 'seller updated successfully'
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            error: `${error.message}`
        })
    }
}

// get all sellers
export const allSellers = async (req, res) => {
    try {
        let data = await seller.find();
        let count = await seller.countDocuments();

        res.status(200).json({
            success: true,
            data,
            totalSeller : count
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: `${error.message}`
        })
    }
}