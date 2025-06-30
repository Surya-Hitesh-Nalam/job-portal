import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import Userroute from "./routes/user.route.js";
import Companyroute from "./routes/company.route.js";
import Jobroute from "./routes/job.route.js";
import Applicationroute from "./routes/application.route.js";

dotenv.config({});

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin:'http://localhost:5173',
    credentials:true
}

app.use(cors(corsOptions));

const port=process.env.port || 3000

app.use('/api/v1/user',Userroute)
app.use('/api/v1/company',Companyroute)
app.use('/api/v1/job',Jobroute)
app.use('/api/v1/application',Applicationroute)

app.listen(port,()=>{
    connectDB()
    console.log(`app is runing on port ${port}`)
})