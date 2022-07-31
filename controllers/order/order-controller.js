
import order from '../../model/order-model.js'
import product from '../../model/product-model.js';

export const getAllOrders = async (req, res) => {
    try {
        let data = await order.find();
        if (data === null) {
            throw new Error("cannot find order")
        }
        let list = data.products
        console.log("list ",list)
        // let orders = []
        // for (let l of list) {
        //     if (l.sellerId.toString() = req.seller._id.toString().trim()) {
        //         orders.push(l)
        //     }
        // }
        res.status(200).json({
            success: true,
            orders:data
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: `${error.message}`
        })
    }
}

export const createOrderCatalog = async (req, res) => {
    try {
        console.log("req.buyer ", req.buyer)
        req.body.buyerId = req.buyer._id

        let id = req.params.sellerId;
        let prod = await product.findOne({ sellerId: id });
        if (!prod) throw new Error("cannot find catalog for this seller")
        let catalogs = []

        catalogs.push(prod);
        req.body.products = catalogs;
        let data = await order(req.body).save();

        res.status(200).json({
            success: true,
            data
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: `${error.message}`
        })
    }
}