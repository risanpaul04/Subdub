import express from 'express';
// import cookieParser from 'cookie-parser';
import { PORT } from './config/env.js'
import connectToDatabase from './database/mongodb.js'

import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import workflowRouter from "./routes/workflow.routes.js";

import errorMiddleware from './middlewares/error.middleware.js';
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";

const port  = process.env.PORT || 3800;

const app = express();
app.use(express.json());
app.use(arcjetMiddleware);
// app.use(express.urlencoded({extended: false}));
// app.use(cookieParser)

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
app.use('/api/v1/workflows', workflowRouter);

app.use(errorMiddleware);

app.get('/', (req, res) => {
    res.send('Welcome to the subscription Tracker API');
});

app.listen(port, async () => {
    console.log(`Subscription tracker API is running on http://localhost:${PORT}`);
    await connectToDatabase();
})

export default app;