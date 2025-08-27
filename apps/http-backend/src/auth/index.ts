

import express,{Router} from 'express';
import { signUpBody,signInBody } from '@repo/types/types';
import bcrypt from 'bcryptjs'
import  jwt  from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();


import {prismaClient}  from "@repo/db/client"


const r: Router= Router();


r.post("/signup", async(req ,res)=>{

    const inputValidation= signUpBody.safeParse(req.body);
    if(!inputValidation.success){
        return res
               .status(411)
               .json({
                "error": inputValidation.error
               })
    }

    const checkExistingUserWithUsername= await prismaClient
                                   .user
                                   .findFirst({
                                    where:{
                                        username: req.body.username 
                                    }
                                   })
    if( checkExistingUserWithUsername){
            return res
                   .status(400)
                   .json({
                    "error":"username already exists"
                   })
                                }
                            
    const checkExistingUserWithEmail= await prismaClient
                                            .user
                                            .findFirst({
                                                where:{
                                                    email: req.body.email
                                                }
                                            })

    if(checkExistingUserWithEmail){
        return res
               .status(400)
               .json({
                "error":"emailId already exists"
               })
    }

    const salt= await bcrypt.genSalt(10);
    const hash= await bcrypt.hash(req.body.password,salt);

    const addUser= await prismaClient
                         .user
                         .create({
                            data:{
                                username: req.body.username,
                                email:   req.body.email,
                                password: hash
                            }
                         })



    res
    .json({
        "message": "User Registered Successfully",
      
    })

  

})

r.post("/signin",async(req ,res)=>{

    const {success} =signInBody.safeParse(req.body);
    if(!success){
        return res
               .status(411)
               .json({
                "message":"Input validation failed"
               })
    }

    const {username, password}= req.body;

    const checkUser = await prismaClient
                            .user
                            .findFirst({
                                where:{
                                    OR:[
                                        {username},
                                        {email:username}
                                    ]
                                }
                            })

    if(!checkUser){
        return res
               .status(400)
               .json({
                "error":"User doesnot exist with username or email"
               })
    }

    const comparePassword =await bcrypt.compare(password,checkUser.password);


    if(!comparePassword){
        return res
               .status(400)
               .json({
                "error":"Incorrect password"
               })
    }
    const accessToken= jwt.sign({
        username:checkUser.username,
        email:checkUser.email
    },process.env.JWT_SECRET!, {expiresIn:60*60})
    const refreshToken= jwt.sign({
        username:req.body.username,
       
    },process.env.JWT_SECRET!, {expiresIn:60*60})


    res
    .json({
        "message": "User Login Successfully",
        accessToken,
        refreshToken
    })

    



})

export default r;