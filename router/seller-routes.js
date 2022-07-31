import express from 'express';
import { createCatalog } from '../controllers/catalog/catalog-controller.js';
import { getAllOrders } from '../controllers/order/order-controller.js';
import { isAuthenticated } from '../middleware/auth.js';
import seller from '../model/seller-model.js';

const sellerRoutes = express.Router();

const token = "sellerAccessToken"

/**
 * @swagger
 * tags:
 *  name: seller-controller
 */


/**
 * @swagger
 * /api/seller/orders:
 *  get:
 *    summary: Retrieve the list of orders received by a seller
 *    tags: [seller-controller]
 *    responses:
 *      '200': 
 *          description: A successfull response
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *      '401': 
 *          description : Unauthorized No token provided ! Please login
 * 
 */
sellerRoutes.get("/api/seller/orders", isAuthenticated(seller, token), getAllOrders);

export default sellerRoutes