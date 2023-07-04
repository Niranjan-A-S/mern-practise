import express, { Application } from 'express';
import { connectToDB } from './config';
import { errorHandler } from './middleware';
import goalsRouter from './routes/goal-routes';
import userRouter from './routes/user-routes';


//Connecting to DB
connectToDB();
const app: Application = express();

//This function is used to access the env variables
const port: number = parseInt(process.env.SERVER_PORT!) || 5000;

//This is used to read the contents of the req body
const { json, urlencoded } = express;
app.use(json());
app.use(urlencoded({ extended: false }));

//Here we are importing all the routes via the router method of express
app.use('/api/goals', goalsRouter);
app.use('/api/users', userRouter);

//Here the express server is using the custom error handler
app.use(errorHandler);

//This method is used to start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
