const express = require("express");
import cors from "cors";
import cookieParser from "cookie-parser";

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

export default app;

// export {app};
