import swaggerUi from 'swagger-ui-express'
import swaggerJsondoc from 'swagger-jsdoc';
import express from 'express';
const swaggerRoutes = express.Router();

swaggerRoutes.get("/swagger", (req, res) => {
    res.json("Hello world! swagger");
});

const swaggerOptions = {
    definition: {
        // components: {},
        openapi: '3.0.0',
        docExpansion: 'none',
        info: {
            title: "e-commerce-marketplace Application",
            description:
                "e-commerce-marketplace Application API reference for developers",
        },
        servers: [
            {
                url: "https://e-commerce-marketplace.herokuapp.com",
                description : "for live server"
            },
            // {
            //     url: "http://localhost:4000",
            //     description: "for live server"
            // },
             
        ]
    },
    // routes
    apis: ["./router/*.js"]

}

const swggerDocs = swaggerJsondoc(swaggerOptions);
swaggerRoutes.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swggerDocs))



export default swaggerRoutes