import express from 'express';
import cors from "cors";
import cookieParser from "cookie-parser";
// import multer from "multer";

const app = express();

// app.use(cors());

//app.use is basically used for middleware & configuration.

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
  })
);

//To configure the json file data 
app.use(express.json({limit: "16kb"}));

app.use(express.urlencoded({extended: true, limit: "16kb"}));

//To configure assetsl like images, pdf, etc. from public folder
app.use(express.static("public"));

//To access & set the browser cookie from server
app.use(cookieParser());

//routes import
import useRouter from './routes/user.routes.js';

//routes declaration
app.use('/api/v1/users', useRouter);

//http://localhost:8000/api/v1/users/register

export default app;

// export {app};
