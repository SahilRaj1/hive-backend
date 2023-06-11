const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");
const gulp = require('gulp');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const env = require("dotenv");
const path = require("path");
env.config({ path: "./.env" });

// AVAILABLE ROUTERS
const authRouter = require(`${__dirname}/routes/authRoutes`);
const commentRouter = require(`${__dirname}/routes/commentRoutes`);
const followRouter = require(`${__dirname}/routes/followRoutes`);
const likeRouter = require(`${__dirname}/routes/likeRoutes`);
const postRouter = require(`${__dirname}/routes/postRoutes`);
const userRouter = require(`${__dirname}/routes/userRoutes`);

connectToMongo();
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Swagger configuration options
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Hive API',
            version: '1.0.0',
        },
    },
    apis: [`${__dirname}/swagger.json`],
};

gulp.task('generate-docs', () => {
    const specs = swaggerJsdoc(options);
    fs.writeFileSync(`${__dirname}/swagger.json`, JSON.stringify(specs, null, 2));
});

// Serve Swagger API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(`${__dirname}/swagger.json`));

// AVAIABLE ROUTES
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter, followRouter);
app.use("/api/posts", postRouter, likeRouter, commentRouter);

app.listen(port, () => {
    console.log(`server listening at http://localhost:${port}`);
});
