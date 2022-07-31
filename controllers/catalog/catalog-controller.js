import product from '../../model/product-model.js'


export const createCatalog = async (req, res) => {
    try {

        if (!req.seller) {
            throw new Error("Not accessable for creating catalog")
        }
        req.body.sellerId = req.seller._id
        let catalog = await product(req.body).save();
        res.status(200).json({
            success: true,
            product: catalog
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: `${error.message}`
        })
    }
}

export const getCatalog = async (req, res) => {
    try {
        let data = await product.findOne({ sellerId: req.params.sellerId });

        if (!data) {
            throw new Error("cannot find catalog of seller")
        }

        res.status(200).json({
            success: true,
            catalog: data
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: `${error.message}`
        })
    }
}

export const listOfCatalogs = async (req, res) => {
    try {
        let data = await product.find();
        res.status(200).json({
            success: true,
            catalogs: data
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: `${error.message}`
        })
    }
}
