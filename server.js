import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import bodyParser from 'body-parser'
import Connection from './db/connection.js'
import swaggerRoutes from './swagger-config.js';
import authRoutes from './router/auth-routes.js';
import sellerRoutes from './router/seller-routes.js';
import buyerRoutes from './router/buyer-routes.js';
import orderRoutes from './router/order-routes.js';
import catalogRoutes from './router/catalog-routes.js';
const app = express()

const PORT = process.env.PORT || 4000

dotenv.config({ path: './config.env' })

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(bodyParser.json({ extends: true }))
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.status(200).json("Hello world")
})


// swagger
app.use("/", swaggerRoutes)
app.use("/", authRoutes)
app.use("/", sellerRoutes)
app.use("/", buyerRoutes)
app.use("/", orderRoutes)
app.use("/", catalogRoutes)


Connection();

app.listen(PORT, () => {
    console.log(`server successfully running on http://localhost:${PORT} port`)
})