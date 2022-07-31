import express from 'express';
import { getCatalog, listOfCatalogs } from '../controllers/catalog/catalog-controller.js';
import { createOrderCatalog } from '../controllers/order/order-controller.js';
import { allSellers, } from '../controllers/seller/seller-controller.js';
import { isAuthenticated } from '../middleware/auth.js'
import buyer from '../model/buyer-model.js'

const buyerRoutes = express.Router();
const buyerAccessToken = "buyerAccessToken"


/**
*  @swagger
*  components:
*    schemas:
*      order:
*        type: object
*        properties:
*          productId:
*            type: string
*        required:
*          - productId
*/


/**
 * @swagger
 * /api/buyer/list-of-sellers:
 *  get:
 *    summary: return all sellers 
 *    tags: [buyer-controller]
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
buyerRoutes.get("/api/buyer/list-of-sellers", isAuthenticated(buyer, buyerAccessToken), allSellers)



/**
 * @swagger
 * /api/buyer/seller-catalog/{sellerId}:
 *  get:
 *    summary: return catalog of seller 
 *    tags: [buyer-controller]
 *    parameters:
 *      - in: path
 *        name: sellerId
 *        schema:
 *          type: string
 * 
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
buyerRoutes.get("/api/buyer/seller-catalog/:sellerId", isAuthenticated(buyer, buyerAccessToken), getCatalog)


/**
 * @swagger
 * /api/buyer/create-order/{sellerId}:
 *  post:
 *    summary : catalog order
 *    tags: [buyer-controller]
 *    parameters:
 *      - in: path
 *        name: sellerId
 *        schema:
 *          type: string
 *    responses:
 *      '200': 
 *          description : succesfully order catalog
 *      '400': 
 *          description : bad request 
 */
buyerRoutes.post("/api/buyer/create-order/:sellerId", isAuthenticated(buyer, buyerAccessToken), createOrderCatalog)

/**
 * @swagger
 * /api/list-catalogs:
 *  get:
 *    summary: return catalog of seller 
 *    tags: [buyer-controller]
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
buyerRoutes.get("/api/list-catalogs", isAuthenticated(buyer, buyerAccessToken), listOfCatalogs);

export default buyerRoutes