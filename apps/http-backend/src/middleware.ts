
import express,{Request} from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();


interface NewReqType extends Request{
    userId ?: string;
}
interface JwtType extends JwtPayload{
    username?: string,
    email?:string
}

export const authMiddleware=(req:NewReqType,res:express.Response,next:express.NextFunction)=>{


    if(!req.headers["authorization"]){
        res
        .status(400)
        .json({
            "error":"Missing access token"
        })
    }
    const token=req.headers["authorization"];
    if(token?.split(" ")[0]!=="Bearer"){
        res
        .status(400)
        .json({
            "error":"Invalid token"
        })

        return;
    }

    try {
        const token2=token.split(" ")[1];
        if(!token2){
            res
            .status(400)
            .json({
                "error":"Invalid token"
            })
    
            return;
         
        }
        const decoded_token= jwt.verify(token2,process.env.JWT_SECRET!) as JwtType;
        console.log(decoded_token.email)
        if(decoded_token){
            req.userId= decoded_token.username;
        }
    } catch (error) {
        res
        .status(500)
        .json({
            "error":"Something went wrong...."
        })
      

        return;
        
    }
    
    
    next();

}
