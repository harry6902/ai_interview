
import express from "express";
import cors from "cors";

import  authRouter from './auth/index'
import  userRouter from './user/index'
import { authMiddleware } from "./middleware";


const app=express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/auth",authRouter);
app.use("/api/v1/user",authMiddleware,userRouter);


app.listen(8080,()=>{
    console.log("App is running on 8080")
})