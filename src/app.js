import express from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app=express();


app.use(cors({
    origin:process.env.ORIGIN_URL,
    credentials:true
}))


app.use(express.json({limit:'16kb'}))
app.use(express.urlencoded({extended:true,limit:'16kb'}));
app.use(express.static('public'));
app.use(cookieParser());


//import routes
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';

app.use('/api/v1/users',userRoutes);
app.use('/api/v1/user',authRoutes);


export {app};
