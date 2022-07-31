import express from 'express';
import { logoutuser, userLogin } from '../controllers/auth/auth-controller.js';
import { adduser } from '../controllers/auth/user-controller.js';
import { isAuthenticated } from '../middleware/auth.js';
import buyer from '../model/buyer-model.js';
import seller from '../model/seller-model.js';

const authRoutes = express.Router();

const sellerAccessToken = "sellerAccessToken"
const buyerAccessToken = "buyerAccessToken"
/**
*  @swagger
*  components:
*    tags: [auth-controller]
*    schemas:
*      User-login:
*        type: object
*        properties:
*          email:
*            type: string
*          password:
*            type: string
*          modelType:
*            type: string
*        required:
*          - email
*          - password
*          - modelType
*/



/**
*  @swagger
*  components:
*    tags: [auth-controller]
*    schemas:
*      User-signup:
*        type: object
*        properties:
*          name:
*            type: string
*          email:
*            type: string
*          password:
*            type: string
*          modelType:
*            type: string
*        required:
*          - name
*          - email
*          - password
*          - modelType
*/


/**
 * @swagger
 * /api/auth/login:
 *  post:
 *    summary : user login
 *    tags: [auth-controller]
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User-login'
 *    responses:
 *      '200': 
 *          description : Successfully logged in
 *      '400': 
 *          description : Invalid credentials 
 */
authRoutes.post("/api/auth/login", userLogin)



/**
 * @swagger
 * /api/auth/register:
 *  post:
 *    summary : user signup
 *    tags: [auth-controller]
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User-signup'
 *    responses:
 *      '200': 
 *          description : Successfully logged in
 *      '400': 
 *          description : Invalid credentials 
 */
authRoutes.post("/api/auth/register", adduser );


// logout from account
/**
 * @swagger
 * /seller/logout:
 *  post:
 *    summary : seller logout (before hit this url vendor should be login)
 *    tags: [auth-controller]
 *    responses:
 *      '200': 
 *          description : vendor successfully logged out
 *      '400': 
 *          description : Invalid credentials 
 */
authRoutes.post("/seller/logout", isAuthenticated(seller, sellerAccessToken), logoutuser)


// logout from account
/**
 * @swagger
 * /buyer/logout:
 *  post:
 *    summary : buyer logout (before hit this url vendor should be login)
 *    tags: [auth-controller]
 *    responses:
 *      '200': 
 *          description : vendor successfully logged out
 *      '400': 
 *          description : Invalid credentials 
 */
authRoutes.post("/buyer/logout", isAuthenticated(buyer, buyerAccessToken), logoutuser)

export default authRoutes;