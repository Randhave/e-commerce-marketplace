import express from 'express';
import { createCatalog } from '../controllers/catalog/catalog-controller.js';
import seller from '../model/seller-model.js';
import { isAuthenticated } from '../middleware/auth.js';



const catalogRoutes = express.Router();

const sellerAccessToken = "sellerAccessToken"


/**
*  @swagger
*  components:
*    tags: [catalog-controller]
*    schemas:
*      catalog:
*        type: object
*        properties:
*          name:
*            type: string
*          price:
*            type: integer
*        required:
*          - name
*          - price
*/



/**
 * @swagger
 * /api/seller/create-catalog:
 *  post:
 *    summary : create catalog
 *    tags: [seller-controller]
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/catalog'
 *    responses:
 *      '200': 
 *          description : Successfully logged in
 *      '400': 
 *          description : Invalid credentials 
 */
catalogRoutes.post("/api/seller/create-catalog", isAuthenticated(seller, sellerAccessToken), createCatalog)

export default catalogRoutes