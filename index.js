const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
const env = require('dotenv');
const path = require('path')
env.config({ path: './.env' });

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

// AVAIABLE ROUTES
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter, followRouter);
app.use('/api/posts', postRouter, likeRouter, commentRouter);

app.listen(port, ()=> {
    console.log(`server listening at http://localhost:${port}`);
});
