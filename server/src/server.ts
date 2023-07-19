import express, { Application } from 'express';
import { connectToDB } from './config';
import { errorHandler } from './middleware';
import goalsRouter from './routes/goal-routes';
import userRouter from './routes/user-routes';
import cors from 'cors';
import path from 'path';


//Connecting to DB
connectToDB();
const app: Application = express();

//enable cross origin policy
app.use(cors());

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


//Server FrontEnd

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '../../client/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../../' + 'client' + 'dist' + 'index.html'));
    })
} else {
    app.get('/', (req, res) => {
        res.send('Please Change the mode to production')
    })
}

//This method is used to start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
